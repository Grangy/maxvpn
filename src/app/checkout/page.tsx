'use client';

import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2, AlertCircle, CheckCircle2, RefreshCw, User } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import LoadingSpinner from '@/components/ui/loading-spinner';
import TelegramAuthModal from '@/components/ui/telegram-auth-modal';
import { getTelegramUserId, isTelegramWebApp } from '@/lib/telegram';
import { getPlans, buySubscription, type Plan } from '@/lib/api-client';

function CheckoutPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const planId = searchParams.get('plan');
  const telegramIdParam = searchParams.get('telegramId');

  const [plan, setPlan] = useState<Plan | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [telegramId, setTelegramId] = useState<string | null>(null);
  const [telegramUser, setTelegramUser] = useState<{
    username?: string;
    firstName?: string;
    lastName?: string;
  } | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Инициализация Telegram ID
  useEffect(() => {
    const checkAuth = async () => {
      if (isTelegramWebApp()) {
        const tgId = getTelegramUserId();
        if (tgId) {
          setTelegramId(tgId);
          // Пытаемся получить данные пользователя
          try {
            if (window.Telegram?.WebApp.initData) {
              const response = await fetch('/apis/auth/telegram', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  initData: window.Telegram.WebApp.initData,
                }),
              });
              const data = await response.json();
              if (data.ok && data.data) {
                setTelegramUser({
                  username: data.data.username,
                  firstName: data.data.firstName,
                  lastName: data.data.lastName,
                });
              }
            }
          } catch (err) {
            console.error('Error getting user data:', err);
          }
        } else {
          // Нет авторизации - показываем модальное окно
          setShowAuthModal(true);
        }
      } else if (telegramIdParam) {
        setTelegramId(telegramIdParam);
      } else {
        // Нет авторизации - показываем модальное окно
        setShowAuthModal(true);
      }
    };

    checkAuth();
  }, [telegramIdParam]);

  // Загрузка тарифов
  const loadPlans = useCallback(async () => {
    if (!planId) {
      setError('Не указан тариф');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await getPlans();

      if (!response.ok) {
        // Обработка различных типов ошибок
        if (response.error === 'API_SECRET is not configured on server') {
          setError('Ошибка конфигурации сервера. Пожалуйста, обратитесь к администратору.');
        } else if (response.error?.includes('401') || response.error?.includes('Unauthorized')) {
          setError('Ошибка авторизации API. Пожалуйста, обновите страницу или обратитесь к администратору.');
        } else {
          setError(response.message || response.error || 'Ошибка загрузки тарифов');
        }
        setLoading(false);
        return;
      }

      if (!response.data || !Array.isArray(response.data)) {
        setError('Неверный формат данных от сервера');
        setLoading(false);
        return;
      }

      // Находим выбранный план
      const selectedPlan = response.data.find((p: Plan) => p.id === planId);
      if (selectedPlan) {
        setPlan(selectedPlan);
      } else {
        setError(`Тариф "${planId}" не найден. Доступные тарифы: ${response.data.map((p: Plan) => p.id).join(', ')}`);
      }
    } catch (err) {
      console.error('Error loading plans:', err);
      setError('Ошибка загрузки тарифов. Проверьте подключение к интернету.');
    } finally {
      setLoading(false);
    }
  }, [planId]);

  useEffect(() => {
    loadPlans();
  }, [loadPlans]);

  const handleRetry = () => {
    loadPlans();
  };

  const handleAuthSuccess = (tgId: string, userData: {
    username?: string;
    firstName?: string;
    lastName?: string;
  }) => {
    setTelegramId(tgId);
    setTelegramUser(userData);
    setShowAuthModal(false);
  };

  const handleBuy = async () => {
    if (!plan) {
      setError('Тариф не выбран');
      return;
    }

    // Проверяем авторизацию
    if (!telegramId) {
      setShowAuthModal(true);
      setError('Необходима авторизация через Telegram');
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      const response = await buySubscription(telegramId, plan.id);

      if (!response.ok) {
        // Обработка специфичных ошибок
        if (response.error === 'INSUFFICIENT_BALANCE') {
          // Редирект на пополнение
          router.push(`/topup?amount=${plan.price}&planId=${plan.id}&telegramId=${telegramId}`);
          return;
        } else if (response.error === 'INVALID_PLAN') {
          setError('Неверный тарифный план. Пожалуйста, выберите другой тариф.');
        } else {
          setError(response.message || response.error || 'Ошибка при покупке подписки');
        }
        setProcessing(false);
        return;
      }

      if (!response.data || !response.data.subscription) {
        setError('Неверный формат ответа от сервера');
        setProcessing(false);
        return;
      }

      // Успешная покупка - редирект на страницу успеха
      const subscription = response.data.subscription;
      router.push(
        `/success?` +
        `subscriptionUrl=${encodeURIComponent(subscription.subscriptionUrl)}&` +
        `subscriptionUrl2=${encodeURIComponent(subscription.subscriptionUrl2)}&` +
        `planName=${encodeURIComponent(subscription.planName)}&` +
        `endDate=${encodeURIComponent(subscription.endDate)}&` +
        `telegramId=${encodeURIComponent(telegramId)}`
      );
    } catch (err) {
      console.error('Error buying subscription:', err);
      setError('Ошибка при покупке подписки. Попробуйте позже.');
      setProcessing(false);
    }
  };

  // Состояние загрузки
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-400">Загрузка тарифов...</p>
        </div>
      </div>
    );
  }

  // Состояние ошибки
  if (error && !plan) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-slate-800/50 rounded-xl border border-red-600/20 p-6"
        >
          <div className="flex items-center justify-center mb-4">
            <AlertCircle className="w-12 h-12 text-red-400" />
          </div>
          <h2 className="text-2xl font-bebas text-white text-center mb-4">Ошибка загрузки</h2>
          <p className="text-gray-300 text-center mb-6">{error}</p>
          <div className="flex flex-col gap-3">
            <Button
              onClick={handleRetry}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Попробовать снова
            </Button>
            <Button
              onClick={() => router.push('/')}
              variant="outline"
              className="w-full"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Вернуться на главную
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Основной контент
  return (
    <React.Fragment>
      <TelegramAuthModal
        isOpen={showAuthModal}
        onClose={() => {
          if (!telegramId) {
            // Если нет авторизации, редиректим на главную
            router.push('/');
          } else {
            setShowAuthModal(false);
          }
        }}
        onSuccess={handleAuthSuccess}
        planId={planId || undefined}
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Кнопка назад */}
          <Button
            onClick={() => router.push('/')}
            variant="outline"
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Назад
          </Button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-800/50 rounded-xl border border-slate-700 p-6 sm:p-8"
          >
            <h1 className="text-3xl sm:text-4xl font-bebas text-white mb-6 text-center">
              Оформление подписки
            </h1>

            {/* Информация об авторизации */}
            {telegramId ? (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-green-600/10 border border-green-600/20 rounded-lg"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-600/20 rounded-full">
                      <User className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <p className="text-green-400 font-medium">
                        Авторизован через Telegram
                      </p>
                      {telegramUser?.firstName && (
                        <p className="text-sm text-gray-400">
                          {telegramUser.firstName} {telegramUser.lastName || ''}
                          {telegramUser.username && ` (@${telegramUser.username})`}
                        </p>
                      )}
                      <p className="text-xs text-gray-500">ID: {telegramId}</p>
                    </div>
                  </div>
                  <Button
                    onClick={() => setShowAuthModal(true)}
                    variant="outline"
                    size="sm"
                  >
                    Изменить
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-yellow-600/10 border border-yellow-600/20 rounded-lg"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-yellow-400" />
                    <div>
                      <p className="text-yellow-400 font-medium">
                        Требуется авторизация через Telegram
                      </p>
                      <p className="text-sm text-gray-400">
                        Для покупки подписки необходимо авторизоваться
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={() => setShowAuthModal(true)}
                    className="bg-blue-600 hover:bg-blue-700"
                    size="sm"
                  >
                    Авторизоваться
                  </Button>
                </div>
              </motion.div>
            )}

          {/* Информация о тарифе */}
          {plan && (
            <div className="mb-8 p-6 bg-slate-700/30 rounded-lg border border-blue-600/30">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bebas text-white">{plan.label || plan.name}</h2>
                <div className="text-right">
                  <div className="text-3xl font-bebas text-blue-400">
                    {formatPrice(plan.price)}
                  </div>
                  {plan.pricePerMonth && (
                    <div className="text-sm text-gray-400">
                      {formatPrice(plan.pricePerMonth)}/мес
                    </div>
                  )}
                </div>
              </div>
              {plan.description && (
                <p className="text-gray-300 mb-4">{plan.description}</p>
              )}
              <div className="flex flex-wrap gap-2">
                {plan.months && (
                  <span className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm">
                    {plan.months} {plan.months === 1 ? 'месяц' : plan.months < 5 ? 'месяца' : 'месяцев'}
                  </span>
                )}
                {plan.duration && (
                  <span className="px-3 py-1 bg-purple-600/20 text-purple-400 rounded-full text-sm">
                    Длительность: {plan.duration} дней
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Ошибка */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-600/10 border border-red-600/20 rounded-lg p-4 mb-6"
            >
              <div className="flex items-start">
                <AlertCircle className="w-5 h-5 text-red-400 mr-2 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-red-400 font-medium mb-1">Ошибка</p>
                  <p className="text-red-300 text-sm">{error}</p>
                </div>
                {error.includes('401') || error.includes('авторизации') ? (
                  <Button
                    onClick={handleRetry}
                    variant="outline"
                    size="sm"
                    className="ml-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                ) : null}
              </div>
            </motion.div>
          )}

          {/* Кнопка оплаты */}
          {plan && (
            <Button
              onClick={handleBuy}
              disabled={processing || !!error || !telegramId}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              size="lg"
            >
              {processing ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Обработка...
                </>
              ) : !telegramId ? (
                <>
                  <User className="w-5 h-5 mr-2" />
                  Сначала авторизуйтесь
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5 mr-2" />
                  Оплатить {formatPrice(plan.price)}
                </>
              )}
            </Button>
          )}

          {/* Дополнительная информация */}
          <div className="mt-6 pt-6 border-t border-slate-700">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-gray-400">
              <div className="flex items-center">
                <CheckCircle2 className="w-4 h-4 text-green-400 mr-2" />
                Безопасная оплата
              </div>
              <div className="flex items-center">
                <CheckCircle2 className="w-4 h-4 text-green-400 mr-2" />
                Мгновенная активация
              </div>
              <div className="flex items-center">
                <CheckCircle2 className="w-4 h-4 text-green-400 mr-2" />
                Гарантия возврата
              </div>
            </div>
          </div>
        </motion.div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center">
          <LoadingSpinner size="lg" />
        </div>
      }
    >
      <CheckoutPageContent />
    </Suspense>
  );
}
