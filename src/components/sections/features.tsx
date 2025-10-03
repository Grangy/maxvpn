'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
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
      icon: Zap,
      title: 'Максимальная скорость',
      description: 'До 10 Гбит/с скорости подключения для комфортной работы и развлечений',
      details: ['Оптимизированные серверы', 'Минимальная задержка', 'Стабильное соединение']
    },
    {
      icon: Shield,
      title: 'VLESS технология',
      description: 'Современный протокол для максимальной анонимности и обхода блокировок',
      details: ['Военный уровень шифрования', 'Невидимость для DPI', 'Обход любых блокировок']
    },
    {
      icon: Globe,
      title: 'Квантовое шифрование',
      description: 'Революционная технология защиты данных с использованием квантовых алгоритмов',
      details: ['Квантовые ключи', 'Непреодолимая защита', 'Будущее уже здесь']
    },
    {
      icon: Smartphone,
      title: 'Все платформы',
      description: 'Поддержка iOS, Android, Windows, macOS и других устройств',
      details: ['Нативные приложения', 'Простая настройка', 'Автоматическое подключение']
    },
    {
      icon: Lock,
      title: 'Полная анонимность',
      description: 'Ваши данные защищены от слежки и перехвата',
      details: ['Нет логов активности', 'Анонимная оплата', 'Защита от утечек']
    },
    {
      icon: Clock,
      title: 'Быстрое подключение',
      description: 'Подключение за минуту через Telegram бота',
      details: ['Автоматическая настройка', 'Мгновенная активация', '24/7 поддержка']
    }
  ];

  const stats = [
    { number: '10', label: 'Гбит/с', suffix: 'максимальная скорость' },
    { number: '∞', label: 'защита', suffix: 'квантовое шифрование' },
    { number: '99.9%', label: 'uptime', suffix: 'стабильность работы' },
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
            Почему выбирают <span className="text-blue-400">MaxVPN</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Современные технологии, максимальная скорость и полная анонимность в одном решении
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={isMobile ? { duration: 0.1 } : { duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
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
              <div className="flex items-center mb-6">
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
                VLESS + <span className="text-purple-400">Квантовое шифрование</span>
              </h3>
              <p className="text-gray-300 mb-6 max-w-2xl">
                Революционное сочетание протокола VLESS и квантового шифрования обеспечивает 
                максимальную скорость, анонимность и обход любых блокировок. Ваше соединение 
                защищено на квантовом уровне и невидимо для систем глубокой проверки пакетов (DPI).
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center text-sm text-blue-400 bg-blue-400/10 px-3 py-1 rounded-full">
                  <Server className="w-4 h-4 mr-2" />
                  Оптимизированные серверы
                </div>
                <div className="flex items-center text-sm text-purple-400 bg-purple-400/10 px-3 py-1 rounded-full">
                  <Eye className="w-4 h-4 mr-2" />
                  Квантовая невидимость
                </div>
                <div className="flex items-center text-sm text-blue-400 bg-blue-400/10 px-3 py-1 rounded-full">
                  <Wifi className="w-4 h-4 mr-2" />
                  Стабильное соединение
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
