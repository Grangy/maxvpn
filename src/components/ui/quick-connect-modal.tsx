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
import Modal from './modal';

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
    <Modal isOpen={isOpen} onClose={onClose} title="Быстрое подключение" size="lg">
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="w-20 h-20 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Zap className="w-10 h-10 text-blue-400" />
          </div>
          <h3 className="text-2xl font-bebas text-white mb-4">
            Подключиться к MaxVPN
          </h3>
          <p className="text-gray-300 mb-6">
            Используйте Telegram бота для быстрой настройки и подключения к VPN.
          </p>
        </motion.div>

        <div className="space-y-4">
          <Button
            onClick={handleTelegramRedirect}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg py-4"
            size="lg"
          >
            <MessageCircle className="w-6 h-6 mr-3" />
            Подключиться через Telegram бота
            <ArrowRight className="w-5 h-5 ml-3" />
          </Button>
        </div>

        <div className="bg-slate-700/50 rounded-xl p-6">
          <h4 className="text-lg font-bebas text-white mb-4">
            Что вы получите:
          </h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 text-blue-400 mr-3" />
              Скорость до 10 Гбит/с
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 text-blue-400 mr-3" />
              VLESS технология
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 text-blue-400 mr-3" />
              Обход любых блокировок
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 text-blue-400 mr-3" />
              Полная анонимность
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 text-blue-400 mr-3" />
              Поддержка всех устройств
            </li>
          </ul>
        </div>
      </div>
    </Modal>
  );
}
