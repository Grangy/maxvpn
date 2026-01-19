'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2, AlertCircle, ExternalLink } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

function TopupPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const telegramId = searchParams.get('telegramId');
  const amountParam = searchParams.get('amount');
  const planId = searchParams.get('planId');
  
  const [amount, setAmount] = useState(amountParam ? parseInt(amountParam) : 100);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);

  const presetAmounts = [100, 250, 500, 1000, 2500, 5000];

  useEffect(() => {
    if (!telegramId) {
      setError('Не указан ID пользователя');
    }
  }, [telegramId]);

  useEffect(() => {
    if (orderId && paymentUrl) {
      // Start polling for payment status
      const interval = setInterval(async () => {
        try {
          const response = await fetch(`/api/topup/${orderId}/status`);
          const data = await response.json();
          
          if (data.ok && data.data.status === 'completed') {
            clearInterval(interval);
            // Redirect to payment page if planId exists, otherwise to success
            if (planId) {
              router.push(`/payment?plan=${planId}&telegramId=${telegramId}`);
            } else {
              router.push(`/success?topup=true&amount=${data.data.amount}`);
            }
          } else if (data.ok && data.data.status === 'failed') {
            clearInterval(interval);
            setError('Оплата не прошла. Попробуйте снова.');
            setPaymentUrl(null);
            setOrderId(null);
          }
        } catch (err) {
          console.error('Error checking payment status:', err);
        }
      }, 3000); // Check every 3 seconds

      return () => clearInterval(interval);
    }
  }, [orderId, paymentUrl, planId, telegramId, router]);

  const handleCreateTopup = async () => {
    if (!telegramId || !amount) return;

    setProcessing(true);
    setError(null);

    try {
      const response = await fetch('/api/topup/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          telegramId,
          amount,
        }),
      });

      const data = await response.json();

      if (data.ok && data.data.paymentUrl) {
        setPaymentUrl(data.data.paymentUrl);
        setOrderId(data.data.orderId);
      } else {
        setError(data.error || 'Ошибка при создании заказа');
      }
      } catch (err: unknown) {
      console.error('Error creating topup:', err);
      setError('Ошибка при создании заказа. Попробуйте позже.');
    } finally {
      setProcessing(false);
    }
  };

  if (!telegramId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 max-w-md w-full text-center"
        >
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bebas text-white mb-4">Ошибка</h2>
          <p className="text-gray-300 mb-6">Не указан ID пользователя</p>
          <Button
            onClick={() => router.push('/')}
            variant="outline"
            className="w-full"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Вернуться на главную
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Button
          onClick={() => router.back()}
          variant="ghost"
          className="mb-6 text-gray-400 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Назад
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700"
        >
          <h1 className="text-3xl font-bebas text-white mb-6">Пополнение баланса</h1>

          {paymentUrl ? (
            <div className="text-center">
              <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-6 mb-6">
                <h2 className="text-xl font-bebas text-white mb-4">Перейдите на страницу оплаты</h2>
                <p className="text-gray-300 mb-6">
                  Сумма пополнения: <span className="text-blue-400 font-bold">{formatPrice(amount)}</span>
                </p>
                <Button
                  onClick={() => window.open(paymentUrl, '_blank')}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-lg"
                  size="lg"
                >
                  <ExternalLink className="w-5 h-5 mr-2" />
                  Перейти к оплате
                </Button>
              </div>
              <p className="text-sm text-gray-400">
                После оплаты вы будете автоматически перенаправлены
              </p>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <label className="block text-gray-300 mb-4">Сумма пополнения</label>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {presetAmounts.map((preset) => (
                    <button
                      key={preset}
                      onClick={() => setAmount(preset)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        amount === preset
                          ? 'border-blue-600 bg-blue-600/20 text-blue-400'
                          : 'border-slate-600 text-gray-300 hover:border-slate-500'
                      }`}
                    >
                      {formatPrice(preset)}
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(parseInt(e.target.value) || 0)}
                  min="1"
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Или введите сумму"
                />
              </div>

              {error && (
                <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4 mb-6">
                  <div className="flex items-center text-red-400">
                    <AlertCircle className="w-5 h-5 mr-2" />
                    <span>{error}</span>
                  </div>
                </div>
              )}

              <Button
                onClick={handleCreateTopup}
                disabled={processing || amount <= 0}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg"
                size="lg"
              >
                {processing ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Создание заказа...
                  </>
                ) : (
                  <>
                    Пополнить на {formatPrice(amount)}
                  </>
                )}
              </Button>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default function TopupPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-white">Загрузка...</div>
      </div>
    }>
      <TopupPageContent />
    </Suspense>
  );
}
