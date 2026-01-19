'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2, AlertCircle } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import LoadingSpinner from '@/components/ui/loading-spinner';

interface Plan {
  id: string;
  name: string;
  price: number;
  duration: number;
  description: string;
}

function PaymentPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const planId = searchParams.get('plan');
  const telegramId = searchParams.get('telegramId');
  
  const [plan, setPlan] = useState<Plan | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!planId || !telegramId) {
      setError('Не указан тариф или ID пользователя');
      setLoading(false);
      return;
    }

    // Load plans
    fetch('/api/plans')
      .then(res => res.json())
      .then(data => {
        if (data.ok) {
          const selectedPlan = data.data.find((p: Plan) => p.id === planId);
          if (selectedPlan) {
            setPlan(selectedPlan);
          } else {
            setError('Тариф не найден');
          }
        } else {
          setError('Ошибка загрузки тарифов');
        }
      })
      .catch((err: unknown) => {
        console.error('Error loading plans:', err);
        setError('Ошибка загрузки тарифов');
      })
      .finally(() => setLoading(false));
  }, [planId, telegramId]);

  const handleBuy = async () => {
    if (!plan || !telegramId) return;

    setProcessing(true);
    setError(null);

    try {
      const response = await fetch('/api/subscription/buy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          telegramId,
          planId: plan.id,
        }),
      });

      const data = await response.json();

      if (data.ok && data.data.subscription) {
        // Redirect to success page with subscription data
        const subscription = data.data.subscription;
        router.push(
          `/success?` +
          `subscriptionUrl=${encodeURIComponent(subscription.subscriptionUrl)}&` +
          `subscriptionUrl2=${encodeURIComponent(subscription.subscriptionUrl2)}&` +
          `planName=${encodeURIComponent(subscription.planName)}&` +
          `endDate=${encodeURIComponent(subscription.endDate)}`
        );
      } else {
        if (data.error === 'INSUFFICIENT_BALANCE') {
          // Redirect to topup page
          router.push(`/topup?telegramId=${telegramId}&amount=${plan.price}&planId=${plan.id}`);
        } else {
          setError(data.message || data.error || 'Ошибка при покупке подписки');
        }
      }
    } catch (err: unknown) {
      console.error('Error buying subscription:', err);
      setError('Ошибка при покупке подписки. Попробуйте позже.');
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error && !plan) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 max-w-md w-full text-center"
        >
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bebas text-white mb-4">Ошибка</h2>
          <p className="text-gray-300 mb-6">{error}</p>
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
          <h1 className="text-3xl font-bebas text-white mb-6">Оплата подписки</h1>

          {plan && (
            <div className="mb-8">
              <div className="bg-slate-700/50 rounded-xl p-6 mb-6">
                <h2 className="text-xl font-bebas text-white mb-2">{plan.name}</h2>
                <p className="text-gray-300 mb-4">{plan.description}</p>
                <div className="text-3xl font-bebas text-blue-400">
                  {formatPrice(plan.price)}
                </div>
                <div className="text-sm text-gray-400 mt-2">
                  Срок действия: {plan.duration} {plan.duration === 1 ? 'месяц' : plan.duration < 5 ? 'месяца' : 'месяцев'}
                </div>
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
                onClick={handleBuy}
                disabled={processing}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg"
                size="lg"
              >
                {processing ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Обработка...
                  </>
                ) : (
                  <>
                    Оплатить {formatPrice(plan.price)}
                  </>
                )}
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    }>
      <PaymentPageContent />
    </Suspense>
  );
}
