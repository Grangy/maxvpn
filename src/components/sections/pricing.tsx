'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Check, Zap, Crown, Star, ArrowRight } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { useMobile } from '@/lib/hooks/use-mobile';

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);
  const isMobile = useMobile();

  const plans = [
    {
      name: 'Базовый',
      icon: Zap,
      price: { monthly: 100, annual: 1000 },
      description: 'Для личного использования',
      features: [
        'Скорость до 1 Гбит/с',
        '3 устройства',
        'Все серверы',
        'Базовая поддержка',
        'VLESS протокол',
        'Защита от утечек DNS'
      ],
      popular: false,
      color: 'border-gray-600'
    },
    {
      name: 'Продвинутый',
      icon: Crown,
      price: { monthly: 250, annual: 2300 },
      description: 'Для активных пользователей',
      features: [
        'Скорость до 1 Гбит/с',
        '5 устройств',
        'Все серверы',
        'Базовая поддержка',
        'VLESS протокол',
        'Защита от утечек DNS'
      ],
      popular: true,
      color: 'border-blue-600'
    },
    {
      name: 'Максимальный',
      icon: Star,
      price: { monthly: 350, annual: 3500 },
      description: 'Для максимальной производительности',
      features: [
        'Скорость до 10 Гбит/с',
        '10 устройств',
        'Все серверы',
        'Базовая поддержка',
        'VLESS протокол',
        'Защита от утечек DNS'
      ],
      popular: false,
      color: 'border-yellow-600'
    }
  ];

  const savings = [
    { plan: 'Базовый', monthly: 100, annual: 1000, save: 200 },
    { plan: 'Продвинутый', monthly: 250, annual: 2300, save: 700 },
    { plan: 'Максимальный', monthly: 350, annual: 3500, save: 700 }
  ];

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
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-12 px-4">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <span className={`text-sm sm:text-lg font-medium ${!isAnnual ? 'text-white' : 'text-gray-400'}`}>
                Месячная оплата
              </span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className="relative inline-flex h-6 w-11 sm:h-8 sm:w-14 items-center rounded-full bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <span
                  className={`inline-block h-4 w-4 sm:h-6 sm:w-6 transform rounded-full bg-blue-600 transition-transform ${
                    isAnnual ? 'translate-x-6 sm:translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`text-sm sm:text-lg font-medium ${isAnnual ? 'text-white' : 'text-gray-400'}`}>
                Годовая оплата
              </span>
            </div>
            {isAnnual && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-600 text-white px-2 py-1 sm:px-3 rounded-full text-xs sm:text-sm font-medium"
              >
                Экономия до 20%
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 px-4 sm:px-0">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={isMobile ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: plan.popular ? 1.05 : 1 }}
              transition={isMobile ? { duration: 0.1 } : { duration: 0.8, delay: index * 0.15, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
              className={`relative p-4 sm:p-6 lg:p-8 rounded-2xl border-2 ${
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
                
                <h3 className="text-xl sm:text-2xl font-bebas text-white mb-2">
                  {plan.name}
                </h3>
                
                <p className="text-sm sm:text-base text-gray-400 mb-4 sm:mb-6">
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
                onClick={() => window.open('https://t.me/maxvpn_offbot', '_blank')}
              >
                <span className="text-sm sm:text-base">Выбрать план</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
              </Button>
            </motion.div>
          ))}
        </div>

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
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center px-6 py-3 bg-green-600/10 border border-green-600/20 rounded-full text-green-400">
            <Check className="w-5 h-5 mr-2" />
            Гарантия возврата денег в течение 30 дней
          </div>
        </motion.div>
      </div>
    </section>
  );
}
