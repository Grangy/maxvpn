'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Check, Zap, Crown, Star, ArrowRight, Loader2 } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { useMobile } from '@/lib/hooks/use-mobile';
import { getPlans, type Plan } from '@/lib/api-client';

// Маппинг planId на иконки и названия
const planIcons: Record<string, typeof Zap> = {
  'M1': Zap,
  'M3': Crown,
  'M6': Star,
};

const planNames: Record<string, string> = {
  'M1': 'Базовый',
  'M3': 'Продвинутый',
  'M6': 'Максимальный',
};

const planDescriptions: Record<string, string> = {
  'M1': 'Для личного использования',
  'M3': 'Для активных пользователей',
  'M6': 'Для максимальной производительности',
};

const defaultFeatures = [
  'Надёжное шифрование',
  'Все серверы',
  'Защита паролей и данных',
  'Доступ к глобальному контенту',
];

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [apiPlans, setApiPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const isMobile = useMobile();

  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = async () => {
    try {
      const response = await getPlans();
      if (response.ok && response.data) {
        setApiPlans(response.data);
      }
    } catch (error) {
      console.error('Error loading plans:', error);
    } finally {
      setLoading(false);
    }
  };

  // Преобразуем API планы в формат для отображения
  const plans = apiPlans.map((apiPlan) => {
    const Icon = planIcons[apiPlan.id] || Zap;
    const name = planNames[apiPlan.id] || apiPlan.label || apiPlan.name || apiPlan.id;
    const description = planDescriptions[apiPlan.id] || apiPlan.description || '';
    const months = apiPlan.months || 1;
    const pricePerMonth = apiPlan.pricePerMonth || apiPlan.price;
    const totalPrice = apiPlan.price;
    
    // Вычисляем годовую цену (если месячный план, умножаем на 12 с скидкой 20%)
    const annualPrice = months === 1 ? Math.round(pricePerMonth * 12 * 0.8) : totalPrice * 2;

    return {
      name,
      planId: apiPlan.id,
      icon: Icon,
      price: { 
        monthly: pricePerMonth, 
        annual: annualPrice 
      },
      description,
      features: defaultFeatures,
      popular: apiPlan.id === 'M3', // M3 - популярный
      color: apiPlan.id === 'M3' ? 'border-blue-600' : apiPlan.id === 'M6' ? 'border-yellow-600' : 'border-gray-600'
    };
  });

  const savings = plans.map(plan => ({
    plan: plan.name,
    monthly: plan.price.monthly,
    annual: plan.price.annual,
    save: plan.price.monthly * 12 - plan.price.annual
  }));

  return (
    <section id="pricing" className="py-20 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={isMobile ? { duration: 0.1 } : { duration: 1.0, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bebas text-white mb-6">
            Выберите свой <span className="text-blue-400">тариф</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Гибкие тарифы для любых потребностей. Экономьте до 20% при оплате за год.
          </p>

          {/* Billing Toggle */}
          <div className="flex flex-col items-center justify-center gap-4 mb-8 sm:mb-12 px-4">
            {/* Toggle Container */}
            <div className="flex items-center justify-center w-full max-w-sm">
              <div className="flex items-center space-x-2 sm:space-x-3 bg-slate-800/50 rounded-xl p-1 border border-slate-700">
                <button
                  onClick={() => setIsAnnual(false)}
                  className={`px-3 py-2 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 ${
                    !isAnnual 
                      ? 'bg-blue-600 text-white shadow-lg' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Месячная
                </button>
                <button
                  onClick={() => setIsAnnual(true)}
                  className={`px-3 py-2 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 ${
                    isAnnual 
                      ? 'bg-blue-600 text-white shadow-lg' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Годовая
                </button>
              </div>
            </div>
            
            {/* Savings Badge */}
            {isAnnual && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-600/20 border border-green-600/30 text-green-400 px-3 py-1 rounded-full text-xs sm:text-sm font-medium"
              >
                💰 Экономия до 20%
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Pricing Cards */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
          </div>
        ) : plans.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            Тарифы временно недоступны
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 px-2 sm:px-0">
            {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={isMobile ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: plan.popular ? 1.05 : 1 }}
              transition={isMobile ? { duration: 0.1 } : { duration: 0.8, delay: index * 0.15, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
              className={`relative p-3 sm:p-4 lg:p-6 rounded-xl border-2 ${
                plan.popular 
                  ? 'bg-gradient-to-br from-blue-600/10 to-blue-600/10 border-blue-600 hover:shadow-lg hover:shadow-blue-500/20' 
                  : 'bg-slate-800/30 border-slate-700 hover:border-blue-600/50 hover:bg-slate-800/50 hover:shadow-lg hover:shadow-blue-500/10'
              } transition-all duration-300 hover:scale-105`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-blue-600 text-white px-2 py-1 sm:px-4 rounded-full text-xs sm:text-sm font-medium flex items-center">
                    <Crown className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    Популярный
                  </div>
                </div>
              )}

              <div className="text-center mb-6 sm:mb-8">
                <div className={`inline-flex p-2 sm:p-3 rounded-xl mb-3 sm:mb-4 ${
                  plan.popular ? 'bg-blue-600/20' : 'bg-slate-700'
                }`}>
                  <plan.icon className={`w-6 h-6 sm:w-8 sm:h-8 ${
                    plan.popular ? 'text-blue-400' : 'text-gray-400'
                  }`} />
                </div>
                
                <h3 className="text-lg sm:text-xl font-bebas text-white mb-2">
                  {plan.name}
                </h3>
                
                <p className="text-xs sm:text-sm text-gray-400 mb-3 sm:mb-4">
                  {plan.description}
                </p>

                <div className="mb-4 sm:mb-6">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bebas text-white mb-1 sm:mb-2">
                    {formatPrice(isAnnual ? plan.price.annual : plan.price.monthly)}
                  </div>
                  <div className="text-sm sm:text-base text-gray-400">
                    {isAnnual ? 'за год' : 'за месяц'}
                  </div>
                  {isAnnual && (
                    <div className="text-xs sm:text-sm text-green-400 mt-1">
                      Экономия {formatPrice(plan.price.monthly * 12 - plan.price.annual)}
                    </div>
                  )}
                </div>
              </div>

              <ul className="space-y-2 sm:space-y-4 mb-6 sm:mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 mr-2 sm:mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full ${
                  plan.popular 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white'
                }`}
                variant={plan.popular ? 'primary' : 'outline'}
                size="sm"
                onClick={() => {
                  // Redirect to checkout page - no telegramId required
                  window.location.href = `/checkout?plan=${plan.planId}`;
                }}
              >
                <span className="text-sm sm:text-base">Выбрать план</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
              </Button>
            </motion.div>
          ))}
          </div>
        )}

        {/* Savings Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 sm:mt-16 p-4 sm:p-6 lg:p-8 bg-slate-800/50 rounded-2xl border border-slate-700 mx-4 sm:mx-0"
        >
          <h3 className="text-xl sm:text-2xl font-bebas text-white text-center mb-6 sm:mb-8">
            Калькулятор экономии
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {savings.map((saving, index) => (
              <div key={index} className="text-center p-3 sm:p-4 bg-slate-700/50 rounded-lg">
                <div className="text-base sm:text-lg font-bebas text-white mb-2">
                  {saving.plan}
                </div>
                <div className="text-xs sm:text-sm text-gray-400 mb-1 sm:mb-2">
                  Месячная: {formatPrice(saving.monthly)}
                </div>
                <div className="text-xs sm:text-sm text-gray-400 mb-1 sm:mb-2">
                  Годовая: {formatPrice(saving.annual)}
                </div>
                <div className="text-sm sm:text-base font-bold text-green-400">
                  Экономия: {formatPrice(saving.save)}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Money Back Guarantee */}
        <motion.div
          initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={isMobile ? { duration: 0.1 } : { duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-8 sm:mt-12 text-center px-4"
        >
          <div className="inline-flex items-center px-3 sm:px-6 py-2 sm:py-3 bg-green-600/10 border border-green-600/20 rounded-full text-green-400 text-sm sm:text-base max-w-full">
            <Check className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
            <span className="text-center leading-tight">
              Гарантия возврата денег в течение 30 дней
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
