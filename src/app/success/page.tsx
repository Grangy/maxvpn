'use client';

import React, { Suspense, useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, MessageCircle, Home, Copy, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { isTelegramWebApp, getTelegramUser, initTelegramWebApp, getStoredPurchaseData, clearStoredPurchaseData } from '@/lib/telegram';

function SuccessPageContent() {
  
  const searchParams = useSearchParams();
  const router = useRouter();
  const subscriptionUrl = searchParams.get('subscriptionUrl');
  const subscriptionUrl2 = searchParams.get('subscriptionUrl2');
  const planName = searchParams.get('planName');
  const endDate = searchParams.get('endDate');
  const telegramId = searchParams.get('telegramId');
  const topup = searchParams.get('topup');
  const amount = searchParams.get('amount');
  
  const [botAuthSent, setBotAuthSent] = useState(false);
  
  const authorizeInBot = useCallback(async () => {
    if (!telegramId || botAuthSent) return;
    
    setBotAuthSent(true);
    try {
      const response = await fetch('/apis/bot/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          telegramId,
          planName,
          subscriptionId: subscriptionUrl?.split('/').pop(), // Извлекаем ID из URL
        }),
      });

      const data = await response.json();
      if (data.ok) {
        console.log('User authorized in bot successfully');
      }
    } catch (error) {
      console.error('Error authorizing in bot:', error);
      // Не критично, продолжаем
    }
  }, [telegramId, planName, subscriptionUrl, botAuthSent]);
  
  useEffect(() => {
    // Initialize Telegram WebApp if available
    if (isTelegramWebApp()) {
      initTelegramWebApp();
    }
    
    // Check for stored purchase data
    const stored = getStoredPurchaseData();
    if (stored && !subscriptionUrl) {
      // Redirect with stored data
      const params = new URLSearchParams();
      if (stored.subscriptionUrl) params.set('subscriptionUrl', stored.subscriptionUrl);
      if (stored.subscriptionUrl2) params.set('subscriptionUrl2', stored.subscriptionUrl2);
      if (stored.planName) params.set('planName', stored.planName);
      if (stored.endDate) params.set('endDate', stored.endDate);
      if (stored.telegramId) params.set('telegramId', stored.telegramId);
      router.replace(`/success?${params.toString()}`);
    }

    // Автоматически авторизуем в боте после успешной покупки
    if (telegramId && subscriptionUrl && !botAuthSent && !topup) {
      authorizeInBot();
    }
  }, [router, subscriptionUrl, telegramId, botAuthSent, topup, authorizeInBot]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  const openHappApp = (url: string) => {
    const encodedUrl = encodeURIComponent(url);
    window.location.href = `happ://add/${encodedUrl}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center px-4">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-green-600/20 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 sm:p-12 border border-slate-700"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-12 h-12 text-green-400" />
          </motion.div>

          {/* Success Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-8"
          >
            <h1 className="text-3xl sm:text-4xl font-bebas text-white mb-4">
              {topup ? 'Баланс пополнен!' : 'Оплата успешна!'}
            </h1>
            <p className="text-lg text-gray-300 mb-6">
              {topup 
                ? `Ваш баланс пополнен на ${amount ? `${amount} ₽` : 'успешно'}. Теперь вы можете приобрести подписку.`
                : 'Спасибо за покупку! Ваша подписка активирована и готова к использованию.'
              }
            </p>
          </motion.div>

          {/* Subscription Links */}
          {subscriptionUrl && !topup && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-slate-700/50 rounded-xl p-6 mb-8"
            >
              <h3 className="text-xl font-bebas text-white mb-4">
                Ссылки на подписку
              </h3>
              
              {planName && (
                <div className="mb-4 p-3 bg-blue-600/10 border border-blue-600/20 rounded-lg">
                  <div className="text-sm text-gray-400 mb-1">Тариф</div>
                  <div className="text-lg font-semibold text-white">{planName}</div>
                  {endDate && (
                    <div className="text-sm text-gray-400 mt-1">
                      Действует до: {new Date(endDate).toLocaleDateString('ru-RU')}
                    </div>
                  )}
                </div>
              )}

              <div className="space-y-3">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Основная ссылка</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={subscriptionUrl}
                      readOnly
                      className="flex-1 px-4 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white text-sm"
                    />
                    <Button
                      onClick={() => copyToClipboard(subscriptionUrl)}
                      variant="outline"
                      size="sm"
                      className="border-slate-500"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => openHappApp(subscriptionUrl)}
                      variant="outline"
                      size="sm"
                      className="border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {subscriptionUrl2 && (
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Резервная ссылка</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={subscriptionUrl2}
                        readOnly
                        className="flex-1 px-4 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white text-sm"
                      />
                      <Button
                        onClick={() => copyToClipboard(subscriptionUrl2)}
                        variant="outline"
                        size="sm"
                        className="border-slate-500"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={() => openHappApp(subscriptionUrl2)}
                        variant="outline"
                        size="sm"
                        className="border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-4 p-3 bg-blue-600/10 border border-blue-600/20 rounded-lg">
                <p className="text-sm text-gray-300">
                  💡 <strong>Совет:</strong> Используйте кнопку с иконкой внешней ссылки для автоматического открытия в приложении Happ
                </p>
              </div>
            </motion.div>
          )}

          {/* Bot Authorization Status */}
          {telegramId && subscriptionUrl && !topup && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 rounded-xl p-6 mb-8 border border-green-600/30"
            >
              <h3 className="text-xl font-bebas text-white mb-4 flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-green-400" />
                Авторизация в боте выполнена
              </h3>
              <p className="text-gray-300 mb-4">
                Ваш аккаунт успешно авторизован в боте @maxvpn_offbot. Вы можете управлять подпиской прямо из бота.
              </p>
              <Button
                onClick={() => window.open('https://t.me/maxvpn_offbot', '_blank')}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                size="lg"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Открыть бота @maxvpn_offbot
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          )}

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-slate-700/50 rounded-xl p-6 mb-8"
          >
            <h3 className="text-xl font-bebas text-white mb-4">
              Что дальше?
            </h3>
            <div className="space-y-3 text-left">
              <div className="flex items-center space-x-3 text-gray-300">
                <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xs text-white font-bold">1</span>
                </div>
                <span>Скопируйте ссылку на подписку или откройте её в приложении Happ</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xs text-white font-bold">2</span>
                </div>
                <span>Настройте клиент на вашем устройстве</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xs text-white font-bold">3</span>
                </div>
                <span>Присоединяйтесь к нашему Telegram боту для поддержки и обновлений</span>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              onClick={() => window.open('https://t.me/maxvpn_offbot', '_blank')}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
              size="lg"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Присоединиться к боту @maxvpn_offbot
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            
             <Button
               asChild
               variant="outline"
               className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white px-8 py-3"
               size="lg"
               href="/"
             >
               <Home className="w-5 h-5 mr-2" />
               На главную
             </Button>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="mt-8 pt-6 border-t border-slate-700"
          >
            <p className="text-sm text-gray-400">
              Нужна помощь? Присоединяйтесь к нашему Telegram боту <strong>@maxvpn_offbot</strong> для поддержки
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-white">Загрузка...</div>
      </div>
    }>
      <SuccessPageContent />
    </Suspense>
  );
}