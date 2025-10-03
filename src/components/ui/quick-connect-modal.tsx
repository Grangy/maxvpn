'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './button';
import { 
  MessageCircle, 
  Zap, 
  CheckCircle, 
  ArrowRight,
  Loader2,
  AlertCircle
} from 'lucide-react';
import ResponsiveModal from './responsive-modal';

interface QuickConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickConnectModal({ isOpen, onClose }: QuickConnectModalProps) {
  const handleTelegramRedirect = () => {
    window.open('https://t.me/maxvpn_offbot', '_blank');
    onClose();
  };

  return (
    <ResponsiveModal isOpen={isOpen} onClose={onClose} title="Быстрое подключение" size="lg">
      <div className="space-y-4 sm:space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
            <Zap className="w-8 h-8 sm:w-10 sm:h-10 text-blue-400" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bebas text-white mb-3 sm:mb-4">
            Подключиться к MaxVPN
          </h3>
          <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6 px-2">
            Используйте Telegram бота для быстрой настройки и подключения к VPN.
          </p>
        </motion.div>

        <div className="space-y-3 sm:space-y-4">
          <Button
            onClick={handleTelegramRedirect}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white text-base sm:text-lg py-3 sm:py-4"
            size="lg"
          >
            <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" />
            <span className="text-sm sm:text-base">Подключиться через Telegram бота</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 sm:ml-3" />
          </Button>
        </div>

        <div className="bg-slate-700/50 rounded-xl p-4 sm:p-6">
          <h4 className="text-base sm:text-lg font-bebas text-white mb-3 sm:mb-4">
            Что вы получите:
          </h4>
          <ul className="space-y-2 text-xs sm:text-sm text-gray-300">
            <li className="flex items-center">
              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400 mr-2 sm:mr-3 flex-shrink-0" />
              <span>Скорость до 10 Гбит/с</span>
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400 mr-2 sm:mr-3 flex-shrink-0" />
              <span>VLESS технология</span>
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400 mr-2 sm:mr-3 flex-shrink-0" />
              <span>Обход любых блокировок</span>
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400 mr-2 sm:mr-3 flex-shrink-0" />
              <span>Полная анонимность</span>
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400 mr-2 sm:mr-3 flex-shrink-0" />
              <span>Поддержка всех устройств</span>
            </li>
          </ul>
        </div>

        {/* Close button at bottom */}
        <div className="pt-4 border-t border-slate-700">
          <Button
            onClick={onClose}
            variant="outline"
            className="w-full border-slate-600 text-gray-300 hover:bg-slate-700 hover:text-white"
          >
            Закрыть
          </Button>
        </div>
      </div>
    </ResponsiveModal>
  );
}
