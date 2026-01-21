'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Globe, 
  Smartphone, 
  Lock, 
  Wifi, 
  Clock, 
  CheckCircle,
  Server,
  Eye
} from 'lucide-react';
import { useMobile } from '@/lib/hooks/use-mobile';

export default function Features() {
  const isMobile = useMobile();
  const features = [
    {
      icon: Shield,
      title: 'Надёжное шифрование',
      description: 'Предотвратите перехват паролей, банковских реквизитов и другой конфиденциальной информации',
      details: ['Военный уровень шифрования', 'Защита от перехвата данных', 'Безопасное соединение']
    },
    {
      icon: Lock,
      title: 'Защита приватности',
      description: 'Ваши данные защищены от слежки и перехвата с помощью MaxGroot Secure Connection',
      details: ['Защита паролей', 'Защита банковских данных', 'Конфиденциальность']
    },
    {
      icon: Globe,
      title: 'Доступ к глобальному контенту',
      description: 'Netflix, Amazon Prime Video, YouTube и другие платформы доступны из любой точки мира',
      details: ['Глобальный доступ', 'Высокая скорость', 'Стабильное соединение']
    },
    {
      icon: Smartphone,
      title: 'Все платформы',
      description: 'Поддержка iOS, Android, Windows, macOS и других устройств',
      details: ['Нативные приложения', 'Простая настройка', 'Автоматическое подключение']
    },
    {
      icon: Eye,
      title: 'Защита от слежки',
      description: 'Ваши действия в интернете остаются приватными и защищёнными',
      details: ['Нет логов активности', 'Анонимность', 'Защита от утечек']
    },
    {
      icon: Clock,
      title: 'Быстрое подключение',
      description: 'Быстрое подключение и настройка',
      details: ['Автоматическая настройка', 'Мгновенная активация', '24/7 поддержка']
    }
  ];

  const stats = [
    { number: '256', label: 'бит', suffix: 'уровень шифрования' },
    { number: '100%', label: 'защита', suffix: 'конфиденциальных данных' },
    { number: '99.9%', label: 'uptime', suffix: 'стабильность' },
    { number: '1', label: 'минута', suffix: 'время подключения' }
  ];

  return (
    <section id="features" className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={isMobile ? { duration: 0.1 } : { duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bebas text-white mb-6">
            Почему выбирают <span className="text-blue-400">MaxGroot</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Защита цифровой жизни с MaxGroot Secure Connection. Надёжное шифрование для защиты приватности и конфиденциальной информации
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={isMobile ? { duration: 0.1 } : { duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={isMobile ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={isMobile ? { duration: 0.1 } : { duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-8 glass-card rounded-2xl hover:border-blue-600/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 group"
            >
              <div className="text-4xl sm:text-5xl font-bebas text-blue-400 mb-3 group-hover:scale-110 transition-transform duration-300">
                {stat.number}
              </div>
              <div className="text-xl font-semibold text-white mb-2">
                {stat.label}
              </div>
              <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                {stat.suffix}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={isMobile ? { duration: 0.1 } : { duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              viewport={{ once: true }}
              className="group p-8 glass-card rounded-2xl hover:border-blue-600/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center justify-center mb-6">
                <div className="p-3 bg-blue-600/20 rounded-xl border border-blue-600/30 group-hover:bg-blue-600/30 transition-colors duration-300">
                  <feature.icon className="w-8 h-8 text-blue-400" />
                </div>
              </div>
              
              <h3 className="text-xl font-bebas text-white mb-4">
                {feature.title}
              </h3>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                {feature.description}
              </p>
              
              <ul className="space-y-2">
                {feature.details.map((detail, detailIndex) => (
                  <li key={detailIndex} className="flex items-center text-sm text-gray-400">
                    <CheckCircle className="w-4 h-4 text-blue-400 mr-3 flex-shrink-0" />
                    {detail}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Technology Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mt-20 p-8 bg-gradient-to-r from-blue-600/10 via-purple-600/5 to-blue-600/10 rounded-2xl border border-blue-600/20 backdrop-blur-sm"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="text-center lg:text-left mb-8 lg:mb-0">
              <h3 className="text-2xl font-bebas text-white mb-4">
                MaxGroot <span className="text-purple-400">Secure Connection</span>
              </h3>
              <p className="text-gray-300 mb-6 max-w-2xl">
                Надёжное шифрование для защиты вашей цифровой жизни. Предотвратите перехват паролей, 
                банковских реквизитов и другой конфиденциальной информации. Получите доступ к глобальному 
                контенту Netflix, Amazon Prime Video, YouTube и других платформ.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center text-sm text-blue-400 bg-blue-400/10 px-3 py-1 rounded-full">
                  <Server className="w-4 h-4 mr-2" />
                  Защита данных
                </div>
                <div className="flex items-center text-sm text-purple-400 bg-purple-400/10 px-3 py-1 rounded-full">
                  <Eye className="w-4 h-4 mr-2" />
                  Приватность
                </div>
                <div className="flex items-center text-sm text-blue-400 bg-blue-400/10 px-3 py-1 rounded-full">
                  <Wifi className="w-4 h-4 mr-2" />
                  Глобальный доступ
                </div>
              </div>
            </div>
            
            <div className="flex-shrink-0">
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-full flex items-center justify-center border border-blue-600/30 animate-pulse">
                  <Shield className="w-16 h-16 text-blue-400" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-purple-600/80 rounded-full animate-ping"></div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
