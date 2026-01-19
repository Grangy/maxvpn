'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Shield, Zap, Globe, Smartphone, Laptop, Monitor, Lock } from 'lucide-react';
import QuickConnectModal from '@/components/ui/quick-connect-modal';
import AnimatedIcon from '@/components/ui/animated-icon';
import Particles from '@/components/ui/particles';
import { useMobile } from '@/lib/hooks/use-mobile';

export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isMobile = useMobile();

  const devices = [
    { icon: Smartphone, name: 'iOS/Android' },
    { icon: Laptop, name: 'Windows' },
    { icon: Monitor, name: 'macOS' },
  ];

  const features = [
    { icon: Shield, text: 'Надёжное шифрование' },
    { icon: Lock, text: 'Защита приватности' },
    { icon: Globe, text: 'Глобальный контент' },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 pt-20">
      {/* Background Effects - Simplified for mobile */}
      {!isMobile && (
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl" />
        </div>
      )}

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(14,165,233,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
      
      {/* Particles */}
      <Particles />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-8 sm:py-12 lg:py-16">
        <motion.div
          initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={isMobile ? { duration: 0.1 } : { duration: 0.8, ease: "easeOut" }}
          className="space-y-4 sm:space-y-6 lg:space-y-8"
        >
          {/* Badge */}
          <motion.div 
            initial={isMobile ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={isMobile ? { duration: 0.1 } : { duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-600/30 text-blue-400 text-sm font-medium backdrop-blur-sm"
          >
            <AnimatedIcon 
              icon={Zap} 
              className="w-4 h-4 mr-2" 
              animation="pulse"
              duration={1.5}
            />
            <span className="text-center">Быстрое подключение через Telegram</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1 
            initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={isMobile ? { duration: 0.1 } : { duration: 0.8, delay: 0.4 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bebas text-white leading-tight"
          >
            <span className="block">Защита цифровой</span>
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent text-shimmer">
              жизни
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={isMobile ? { duration: 0.1 } : { duration: 0.8, delay: 0.6 }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4"
          >
            с <span className="text-blue-400 font-bold bg-blue-400/10 px-2 py-1 rounded">MaxGroot Secure Connection</span>
          </motion.p>
          
          <motion.p 
            initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={isMobile ? { duration: 0.1 } : { duration: 0.8, delay: 0.8 }}
            className="text-sm sm:text-base md:text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed px-4 mt-4"
          >
            🔒 Надёжное шифрование • 🛡️ Защита приватности • 📱 Все платформы • 🚀 Подключение за минуту
          </motion.p>

          {/* Features */}
          <motion.div 
            initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={isMobile ? { duration: 0.1 } : { duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap justify-center gap-3 sm:gap-6 text-xs sm:text-sm px-4"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={isMobile ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={isMobile ? { duration: 0.1 } : { duration: 0.5, delay: 1.0 + index * 0.1 }}
                className="flex items-center space-x-2 text-gray-300 bg-slate-800/30 px-3 py-2 rounded-full border border-slate-700 hover:border-blue-600/50 transition-all duration-300"
              >
                <AnimatedIcon 
                  icon={feature.icon} 
                  className="w-4 h-4 text-blue-400" 
                  animation="float"
                  delay={index * 0.1}
                />
                <span className="text-sm">{feature.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={isMobile ? { duration: 0.1 } : { duration: 0.8, delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4"
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-2xl hover:shadow-blue-500/25 hover:scale-105 transition-all duration-300 w-full sm:w-auto hover-lift hover-glow border border-blue-500/30"
              onClick={() => setIsModalOpen(true)}
            >
              <AnimatedIcon 
                icon={Zap} 
                className="w-5 h-5 mr-2" 
                animation="pulse"
                duration={1}
              />
              <span>Подключиться сейчас</span>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white hover:scale-105 transition-all duration-300 w-full sm:w-auto backdrop-blur-sm"
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span>Узнать больше</span>
            </Button>
          </motion.div>

          {/* Devices */}
          <motion.div 
            initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={isMobile ? { duration: 0.1 } : { duration: 0.8, delay: 1.4 }}
            className="flex justify-center space-x-6 sm:space-x-8 pt-8 sm:pt-12 px-4"
          >
            {devices.map((device, index) => (
              <motion.div
                key={index}
                initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={isMobile ? { duration: 0.1 } : { duration: 0.6, delay: 1.6 + index * 0.1 }}
                className="flex flex-col items-center space-y-3 text-gray-400 group"
              >
                <div className="p-4 bg-gradient-to-br from-slate-800/50 to-slate-700/50 rounded-xl border border-slate-700 group-hover:border-blue-600/50 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-blue-500/20 hover-lift">
                  <device.icon className="w-8 h-8 text-gray-400 group-hover:text-blue-400 transition-colors duration-300" />
                </div>
                <span className="text-sm font-medium text-center group-hover:text-white transition-colors duration-300">{device.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator - Hidden on mobile */}
      {!isMobile && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-gray-400 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      )}

      {/* Quick Connect Modal */}
      <QuickConnectModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </section>
  );
}
