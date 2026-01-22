'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Check, Zap, Crown, Star, Sparkles, ArrowRight, Loader2, Shield, Rocket, Infinity, MessageCircle } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { useMobile } from '@/lib/hooks/use-mobile';
import { getPlans, type Plan } from '@/lib/api-client';

// Разрешенные планы: только 1, 3, 6, 12 месяцев
const ALLOWED_PLANS = ['M1', 'M3', 'M6', 'M12'];

// Маппинг planId на иконки и названия
const planIcons: Record<string, typeof Zap> = {
  'M1': Zap,
  'M3': Crown,
  'M6': Star,
  'M12': Sparkles,
};

const planNames: Record<string, string> = {
  'M1': '1 месяц',
  'M3': '3 месяца',
  'M6': '6 месяцев',
  'M12': '12 месяцев',
};

const planDescriptions: Record<string, string> = {
  'M1': 'Идеально для начала',
  'M3': 'Оптимальный выбор',
  'M6': 'Максимальная выгода',
  'M12': 'Лучшее предложение',
};

const planBadges: Record<string, string> = {
  'M1': '',
  'M3': 'Популярный',
  'M6': 'Выгодно',
  'M12': 'Лучшая цена',
};

const defaultFeatures = [
  'Надёжное шифрование',
  'Все серверы',
  'Защита паролей и данных',
  'Доступ к глобальному контенту',
];

export default function Pricing() {
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

  // Фильтруем и преобразуем API планы в формат для отображения
  const plans = apiPlans
    .filter((apiPlan) => ALLOWED_PLANS.includes(apiPlan.id))
    .sort((a, b) => {
      // Сортируем по порядку: M1, M3, M6, M12
      const order = ['M1', 'M3', 'M6', 'M12'];
      return order.indexOf(a.id) - order.indexOf(b.id);
    })
    .map((apiPlan) => {
      const Icon = planIcons[apiPlan.id] || Zap;
      const name = planNames[apiPlan.id] || apiPlan.label || apiPlan.name || apiPlan.id;
      const description = planDescriptions[apiPlan.id] || apiPlan.description || '';
      const months = apiPlan.months || 1;
      const pricePerMonth = apiPlan.pricePerMonth || (apiPlan.price / months);
      const totalPrice = apiPlan.price;
      const badge = planBadges[apiPlan.id] || '';

      return {
        name,
        planId: apiPlan.id,
        icon: Icon,
        price: totalPrice,
        pricePerMonth,
        months,
        description,
        features: defaultFeatures,
        popular: apiPlan.id === 'M3',
        badge,
        color: apiPlan.id === 'M3' 
          ? 'border-blue-600' 
          : apiPlan.id === 'M6' 
          ? 'border-yellow-600' 
          : apiPlan.id === 'M12'
          ? 'border-purple-600'
          : 'border-gray-600'
      };
    });

  // Вычисляем экономию для каждого плана
  const calculateSavings = (plan: typeof plans[0]) => {
    if (plan.months === 1) return 0;
    const monthlyPrice = plan.pricePerMonth;
    const totalPrice = plan.price;
    const expectedPrice = monthlyPrice * plan.months;
    return expectedPrice - totalPrice;
  };

  return (
    <section id="pricing" className="py-20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Декоративные элементы фона */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/5 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Улучшенный Header */}
        <motion.div
          initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={isMobile ? { duration: 0.1 } : { duration: 1.0, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-4"
          >
            <div className="bg-blue-600/10 border border-blue-600/30 rounded-full px-4 py-2 text-blue-400 text-sm font-medium flex items-center justify-center gap-2">
              <Shield className="w-4 h-4" />
              <span>Безопасные тарифы</span>
            </div>
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bebas text-white mb-6 bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent">
            Выберите свой <span className="text-blue-400">тариф</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Гибкие тарифы для любых потребностей. Чем дольше подписка, тем больше выгода.
          </p>
        </motion.div>

        {/* Улучшенные Pricing Cards */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
          </div>
        ) : plans.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            Тарифы временно недоступны
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 px-2 sm:px-0">
            {plans.map((plan, index) => {
              const savings = calculateSavings(plan);
              const savingsPercent = plan.months > 1 ? Math.round((savings / (plan.pricePerMonth * plan.months)) * 100) : 0;
              
              return (
                <motion.div
                  key={plan.name}
                  initial={isMobile ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={isMobile ? { duration: 0.1 } : { duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                  viewport={{ once: true, margin: "-100px" }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className={`relative group p-6 sm:p-8 rounded-2xl border-2 backdrop-blur-sm transition-all duration-300 ${
                    plan.popular 
                      ? 'bg-gradient-to-br from-blue-600/20 via-blue-600/10 to-slate-800/30 border-blue-500 shadow-2xl shadow-blue-500/20' 
                      : plan.planId === 'M12'
                      ? 'bg-gradient-to-br from-purple-600/20 via-purple-600/10 to-slate-800/30 border-purple-500/50 shadow-xl shadow-purple-500/10'
                      : 'bg-slate-800/40 border-slate-700/50 hover:border-blue-500/50 hover:bg-slate-800/60 shadow-lg'
                  }`}
                >
                  {/* Badge */}
                  {plan.badge && (
                    <div className={`absolute -top-3 left-1/2 transform -translate-x-1/2 z-10 ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-blue-600 to-blue-500' 
                        : plan.planId === 'M12'
                        ? 'bg-gradient-to-r from-purple-600 to-purple-500'
                        : 'bg-gradient-to-r from-yellow-600 to-yellow-500'
                    } text-white px-4 py-1 rounded-full text-xs sm:text-sm font-medium flex items-center gap-1 shadow-lg`}>
                      {plan.popular && <Crown className="w-3 h-3" />}
                      {plan.planId === 'M12' && <Sparkles className="w-3 h-3" />}
                      {plan.planId === 'M6' && <Star className="w-3 h-3" />}
                      {plan.badge}
                    </div>
                  )}

                  {/* Иконка с градиентом */}
                  <div className="text-center mb-6">
                    <div className={`inline-flex p-4 rounded-2xl mb-4 ${
                      plan.popular 
                        ? 'bg-gradient-to-br from-blue-600/30 to-blue-500/20' 
                        : plan.planId === 'M12'
                        ? 'bg-gradient-to-br from-purple-600/30 to-purple-500/20'
                        : 'bg-slate-700/50'
                    }`}>
                      <plan.icon className={`w-8 h-8 sm:w-10 sm:h-10 ${
                        plan.popular 
                          ? 'text-blue-400' 
                          : plan.planId === 'M12'
                          ? 'text-purple-400'
                          : 'text-gray-400'
                      }`} />
                    </div>
                    
                    <h3 className="text-xl sm:text-2xl font-bebas text-white mb-2">
                      {plan.name}
                    </h3>
                    
                    <p className="text-sm text-gray-400 mb-4">
                      {plan.description}
                    </p>

                    {/* Цена */}
                    <div className="mb-4">
                      <div className="text-3xl sm:text-4xl lg:text-5xl font-bebas text-white mb-2">
                        {formatPrice(plan.price)}
                      </div>
                      <div className="text-sm text-gray-400 mb-1">
                        {plan.pricePerMonth && `${formatPrice(plan.pricePerMonth)}/мес`}
                      </div>
                      {savings > 0 && (
                        <div className="text-xs sm:text-sm text-green-400 font-medium flex items-center justify-center gap-1">
                          <span>💰 Экономия {formatPrice(savings)}</span>
                          {savingsPercent > 0 && (
                            <span className="bg-green-600/20 px-2 py-0.5 rounded-full">
                              -{savingsPercent}%
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8 min-h-[140px]">
                    {plan.features.map((feature, featureIndex) => (
                      <motion.li 
                        key={featureIndex} 
                        className="flex items-start"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + featureIndex * 0.05 }}
                      >
                        <div className={`p-1 rounded-full mr-3 flex-shrink-0 mt-0.5 ${
                          plan.popular 
                            ? 'bg-blue-600/20' 
                            : plan.planId === 'M12'
                            ? 'bg-purple-600/20'
                            : 'bg-slate-700/50'
                        }`}>
                          <Check className={`w-3 h-3 ${
                            plan.popular 
                              ? 'text-blue-400' 
                              : plan.planId === 'M12'
                              ? 'text-purple-400'
                              : 'text-green-400'
                          }`} />
                        </div>
                        <span className="text-sm text-gray-300 leading-relaxed">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* Кнопка */}
                  <Button
                    className={`w-full group/btn relative overflow-hidden ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white shadow-lg shadow-blue-500/30' 
                        : plan.planId === 'M12'
                        ? 'bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-600 text-white shadow-lg shadow-purple-500/30'
                        : 'border-2 border-blue-600/50 text-blue-400 hover:bg-blue-600 hover:text-white hover:border-blue-600'
                    } transition-all duration-300`}
                    variant={plan.popular || plan.planId === 'M12' ? 'primary' : 'outline'}
                    size="lg"
                    onClick={() => {
                      // Редирект в Telegram бота с параметром плана
                      const botUrl = `https://t.me/maxvpn_offbot?start=plan_${plan.planId}`;
                      window.open(botUrl, '_blank');
                    }}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-base font-medium">Приобрести</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </span>
                  </Button>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Улучшенная гарантия */}
        <motion.div
          initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={isMobile ? { duration: 0.1 } : { duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 sm:mt-16 text-center px-4"
        >
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600/10 to-emerald-600/10 border border-green-600/30 rounded-full text-green-400 text-sm sm:text-base backdrop-blur-sm shadow-lg">
            <Shield className="w-5 h-5 mr-2 flex-shrink-0" />
            <span className="text-center leading-tight font-medium">
              Гарантия возврата денег в течение 30 дней
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
