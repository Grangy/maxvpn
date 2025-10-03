'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, ArrowLeft, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center">
              <FileText className="w-8 h-8 text-blue-400" />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bebas text-white mb-4">
            Условия <span className="text-blue-400">пользования</span>
          </h1>
          <p className="text-lg text-gray-300">
            Последнее обновление: {new Date().toLocaleDateString('ru-RU')}
          </p>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 sm:p-12 border border-slate-700"
        >
          <div className="prose prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bebas text-white mb-4">1. Принятие условий</h2>
              <p className="text-gray-300 mb-4">
                Используя сервис MaxVPN, вы соглашаетесь с данными условиями пользования. 
                Если вы не согласны с какими-либо условиями, пожалуйста, не используйте наш сервис.
              </p>
              <p className="text-gray-300">
                Мы оставляем за собой право изменять данные условия в любое время. 
                Продолжение использования сервиса после внесения изменений означает ваше согласие с новыми условиями.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bebas text-white mb-4">2. Описание сервиса</h2>
              <p className="text-gray-300 mb-4">
                MaxVPN предоставляет VPN-сервис для обеспечения приватности и безопасности в интернете. 
                Наш сервис включает:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                <li>Шифрование интернет-трафика</li>
                <li>Смену IP-адреса</li>
                <li>Обход географических ограничений</li>
                <li>Защиту от утечек DNS</li>
                <li>Техническую поддержку</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bebas text-white mb-4">3. Регистрация и аккаунт</h2>
              <p className="text-gray-300 mb-4">
                Для использования сервиса необходимо:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                <li>Быть не младше 18 лет</li>
                <li>Предоставить достоверную информацию</li>
                <li>Обеспечить безопасность своего аккаунта</li>
                <li>Нести ответственность за действия под вашим аккаунтом</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bebas text-white mb-4">4. Платежи и подписки</h2>
              <p className="text-gray-300 mb-4">
                Условия оплаты:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                <li>Оплата производится авансом</li>
                <li>Подписка продлевается автоматически</li>
                <li>Возврат средств возможен в течение 7 дней</li>
                <li>Цены могут изменяться с уведомлением</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bebas text-white mb-4">5. Запрещенное использование</h2>
              <p className="text-gray-300 mb-4">
                Запрещается использовать сервис для:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                <li>Незаконной деятельности</li>
                <li>Нарушения авторских прав</li>
                <li>Распространения вредоносного ПО</li>
                <li>Спама или фишинга</li>
                <li>Атак на другие системы</li>
                <li>Торговли наркотиками или оружием</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bebas text-white mb-4">6. Ограничения ответственности</h2>
              <p className="text-gray-300 mb-4">
                MaxVPN не несет ответственности за:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                <li>Временные технические сбои</li>
                <li>Потерю данных пользователя</li>
                <li>Действия третьих лиц</li>
                <li>Нарушения законодательства пользователем</li>
                <li>Косвенные убытки</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bebas text-white mb-4">7. Прекращение обслуживания</h2>
              <p className="text-gray-300 mb-4">
                Мы можем приостановить или прекратить обслуживание в случае:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                <li>Нарушения условий пользования</li>
                <li>Неоплаты услуг</li>
                <li>Технических проблем</li>
                <li>Требований правоохранительных органов</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bebas text-white mb-4">8. Интеллектуальная собственность</h2>
              <p className="text-gray-300 mb-4">
                Все права на сервис, включая программное обеспечение, дизайн и контент, 
                принадлежат MaxVPN. Пользователям запрещается копировать, модифицировать 
                или распространять наш контент без разрешения.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bebas text-white mb-4">9. Применимое право</h2>
              <p className="text-gray-300 mb-4">
                Данные условия регулируются законодательством Российской Федерации. 
                Все споры разрешаются в судах по месту нахождения MaxVPN.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bebas text-white mb-4">10. Контактная информация</h2>
              <p className="text-gray-300 mb-4">
                По вопросам, связанным с условиями пользования, обращайтесь:
              </p>
              <div className="bg-slate-700/50 rounded-lg p-4">
                <div className="flex items-center space-x-3 text-blue-400">
                  <MessageCircle className="w-5 h-5" />
                  <span>Telegram: @maxvpn_offbot</span>
                </div>
              </div>
            </section>
          </div>
        </motion.div>

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-8"
        >
           <Button
             asChild
             variant="outline"
             className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white"
             size="lg"
             href="/"
           >
             <ArrowLeft className="w-5 h-5 mr-2" />
             Вернуться на главную
           </Button>
        </motion.div>
      </div>
    </div>
  );
}