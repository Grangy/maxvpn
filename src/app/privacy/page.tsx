'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, ArrowLeft, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center mb-6">
            <Button 
              asChild
              variant="ghost" 
              size="sm" 
              className="text-gray-400 hover:text-white"
              href="/"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Назад
            </Button>
          </div>
          
          <div className="flex items-center space-x-4 mb-6">
            <div className="p-3 bg-blue-600/20 rounded-lg">
              <Shield className="w-8 h-8 text-blue-400" />
            </div>
            <h1 className="text-4xl font-bebas text-white">Политика конфиденциальности</h1>
          </div>
          
          <p className="text-gray-300 text-lg">
            Последнее обновление: {new Date().toLocaleDateString('ru-RU')}
          </p>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="prose prose-invert max-w-none"
        >
          <div className="space-y-8">
            <section className="bg-slate-800/50 rounded-xl p-8 border border-slate-700">
              <h2 className="text-2xl font-bebas text-white mb-4">1. Сбор информации</h2>
              <p className="text-gray-300 leading-relaxed">
                Мы собираем минимально необходимую информацию для предоставления услуг VPN:
              </p>
              <ul className="list-disc list-inside text-gray-300 mt-4 space-y-2">
                <li>Имя пользователя для связи</li>
                <li>Информация о выбранном тарифе</li>
                <li>Технические данные для настройки подключения</li>
                <li>Информация об использовании сервиса (без содержания трафика)</li>
              </ul>
            </section>

            <section className="bg-slate-800/50 rounded-xl p-8 border border-slate-700">
              <h2 className="text-2xl font-bebas text-white mb-4">2. Использование данных</h2>
              <p className="text-gray-300 leading-relaxed">
                Ваши данные используются исключительно для:
              </p>
              <ul className="list-disc list-inside text-gray-300 mt-4 space-y-2">
                <li>Предоставления VPN услуг</li>
                <li>Технической поддержки</li>
                <li>Улучшения качества сервиса</li>
                <li>Соблюдения требований законодательства</li>
              </ul>
            </section>

            <section className="bg-slate-800/50 rounded-xl p-8 border border-slate-700">
              <h2 className="text-2xl font-bebas text-white mb-4">3. Защита данных</h2>
              <p className="text-gray-300 leading-relaxed">
                Мы применяем современные методы защиты данных:
              </p>
              <ul className="list-disc list-inside text-gray-300 mt-4 space-y-2">
                <li>Квантовое шифрование для всех данных</li>
                <li>Строгая политика &quot;No Logs&quot;</li>
                <li>Регулярные аудиты безопасности</li>
                <li>Физическая защита серверов</li>
              </ul>
            </section>

            <section className="bg-slate-800/50 rounded-xl p-8 border border-slate-700">
              <h2 className="text-2xl font-bebas text-white mb-4">4. Передача данных третьим лицам</h2>
              <p className="text-gray-300 leading-relaxed">
                Мы не продаем и не передаем ваши персональные данные третьим лицам, 
                за исключением случаев, предусмотренных законодательством.
              </p>
            </section>

            <section className="bg-slate-800/50 rounded-xl p-8 border border-slate-700">
              <h2 className="text-2xl font-bebas text-white mb-4">5. Ваши права</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Вы имеете право:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>Запросить информацию о ваших данных</li>
                <li>Исправить неточную информацию</li>
                <li>Удалить ваши данные</li>
                <li>Ограничить обработку данных</li>
                <li>Подать жалобу в надзорный орган</li>
              </ul>
            </section>

            <section className="bg-slate-800/50 rounded-xl p-8 border border-slate-700">
              <h2 className="text-2xl font-bebas text-white mb-4">6. Контактная информация</h2>
              <p className="text-gray-300 leading-relaxed">
                По вопросам обработки персональных данных обращайтесь через наш Telegram бот:
              </p>
              <div className="mt-4">
                <Button
                  onClick={() => window.open('https://t.me/maxvpn_offbot', '_blank')}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  @maxvpn_offbot
                </Button>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}