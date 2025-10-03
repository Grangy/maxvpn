'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { XCircle, ArrowRight, MessageCircle, Home, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function FailPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center px-4">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-red-600/20 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 sm:p-12 border border-slate-700"
        >
          {/* Error Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <XCircle className="w-12 h-12 text-red-400" />
          </motion.div>

          {/* Error Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-8"
          >
            <h1 className="text-3xl sm:text-4xl font-bebas text-white mb-4">
              Оплата <span className="text-red-400">не прошла</span>
            </h1>
            <p className="text-lg text-gray-300 mb-6">
              К сожалению, произошла ошибка при обработке платежа. Ваши средства не были списаны.
            </p>
          </motion.div>

          {/* Possible Reasons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-slate-700/50 rounded-xl p-6 mb-8"
          >
            <h3 className="text-xl font-bebas text-white mb-4">
              Возможные причины:
            </h3>
            <div className="space-y-3 text-left">
              <div className="flex items-center space-x-3 text-gray-300">
                <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xs text-white font-bold">!</span>
                </div>
                <span>Недостаточно средств на карте</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xs text-white font-bold">!</span>
                </div>
                <span>Банк заблокировал транзакцию</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xs text-white font-bold">!</span>
                </div>
                <span>Техническая ошибка платежной системы</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xs text-white font-bold">!</span>
                </div>
                <span>Истек срок действия карты</span>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              onClick={() => window.history.back()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
              size="lg"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              Попробовать снова
            </Button>
            
            <Button
              onClick={() => window.open('https://t.me/maxvpn_offbot', '_blank')}
              variant="outline"
              className="border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white px-8 py-3"
              size="lg"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Связаться с поддержкой
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>

          {/* Additional Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="mt-8 pt-6 border-t border-slate-700"
          >
             <div className="flex flex-col sm:flex-row gap-4 justify-center">
               <Button
                 asChild
                 variant="ghost"
                 className="text-gray-400 hover:text-white"
                 size="sm"
                 href="/"
               >
                 <Home className="w-4 h-4 mr-2" />
                 На главную
               </Button>
               
               <Button
                 asChild
                 variant="ghost"
                 className="text-gray-400 hover:text-white"
                 size="sm"
                 href="/#pricing"
               >
                 Посмотреть тарифы
               </Button>
             </div>
          </motion.div>

          {/* Support Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="mt-6"
          >
            <p className="text-sm text-gray-400">
              Если проблема повторяется, обратитесь к нашему Telegram боту для получения помощи
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}