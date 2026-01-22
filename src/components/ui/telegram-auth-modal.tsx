'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { X, Loader2, AlertCircle, MessageCircle } from 'lucide-react';
import { isTelegramWebApp, initTelegramWebApp } from '@/lib/telegram';

interface TelegramAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (telegramId: string, userData: {
    username?: string;
    firstName?: string;
    lastName?: string;
  }) => void;
  planId?: string;
}

export default function TelegramAuthModal({
  isOpen,
  onClose,
  onSuccess,
  planId,
}: TelegramAuthModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isTelegram, setIsTelegram] = useState(false);

  const handleTelegramAuth = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Проверяем, находимся ли мы в Telegram WebApp
      if (isTelegramWebApp() && window.Telegram?.WebApp.initData) {
        const response = await fetch('/apis/auth/telegram', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            initData: window.Telegram.WebApp.initData,
          }),
        });

        const data = await response.json();
        
        if (data.ok && data.data) {
          onSuccess(data.data.telegramId, {
            username: data.data.username,
            firstName: data.data.firstName,
            lastName: data.data.lastName,
          });
          return;
        } else {
          setError(data.error || 'Ошибка авторизации');
        }
      } else {
        // Если не в Telegram WebApp, открываем бота
        const botUrl = `https://t.me/maxvpn_offbot${planId ? `?start=plan_${planId}` : ''}`;
        window.open(botUrl, '_blank');
        setError('Пожалуйста, авторизуйтесь в боте и вернитесь на сайт');
      }
    } catch (err) {
      console.error('Error authenticating:', err);
      setError('Ошибка при авторизации. Попробуйте еще раз.');
    } finally {
      setLoading(false);
    }
  }, [planId, onSuccess]);

  useEffect(() => {
    if (isOpen) {
      const isTG = isTelegramWebApp();
      setIsTelegram(isTG);
      if (isTG) {
        initTelegramWebApp();
        // Автоматически авторизуем если в Telegram WebApp
        handleTelegramAuth();
      }
    }
  }, [isOpen, handleTelegramAuth]);

  const handleManualAuth = () => {
    const botUrl = `https://t.me/maxvpn_offbot${planId ? `?start=plan_${planId}` : ''}`;
    window.open(botUrl, '_blank');
    setError('Пожалуйста, авторизуйтесь в боте и вернитесь на сайт');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative bg-slate-800 rounded-2xl border border-slate-700 shadow-2xl max-w-md w-full p-6 sm:p-8"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Content */}
          <div className="text-center">
            <div className="inline-flex p-4 rounded-full bg-blue-600/20 mb-6">
              <MessageCircle className="w-8 h-8 text-blue-400" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-bebas text-white mb-4">
              Авторизация через Telegram
            </h2>

            <p className="text-gray-300 mb-6">
              Для покупки подписки необходимо авторизоваться через Telegram бот
            </p>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-600/10 border border-red-600/20 rounded-lg"
              >
                <div className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-red-400 mr-2 flex-shrink-0 mt-0.5" />
                  <p className="text-red-300 text-sm text-left">{error}</p>
                </div>
              </motion.div>
            )}

            {isTelegram ? (
              <div className="space-y-4">
                <p className="text-sm text-gray-400">
                  Вы находитесь в Telegram WebApp. Авторизация выполняется автоматически...
                </p>
                {loading && (
                  <div className="flex items-center justify-center">
                    <Loader2 className="w-6 h-6 text-blue-400 animate-spin" />
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <Button
                  onClick={handleTelegramAuth}
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  size="lg"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Авторизация...
                    </>
                  ) : (
                    <>
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Авторизоваться через Telegram
                    </>
                  )}
                </Button>

                <p className="text-xs text-gray-500">
                  Или откройте бота вручную:
                </p>

                <Button
                  onClick={handleManualAuth}
                  variant="outline"
                  className="w-full"
                  size="sm"
                >
                  Открыть бота
                </Button>
              </div>
            )}

            <div className="mt-6 pt-6 border-t border-slate-700">
              <p className="text-xs text-gray-500">
                После авторизации в боте вы сможете продолжить покупку подписки
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
