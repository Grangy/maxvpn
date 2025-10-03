'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  Send, 
  MessageCircle, 
  CheckCircle, 
  AlertCircle
} from 'lucide-react';
import LoadingSpinner from '@/components/ui/loading-spinner';

interface FormData {
  name: string;
  message: string;
  plan: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    message: '',
    plan: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const plans = [
    { value: 'basic', label: 'Базовый' },
    { value: 'advanced', label: 'Продвинутый' },
    { value: 'maximum', label: 'Максимальный' },
    { value: 'custom', label: 'Индивидуальный' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          message: '',
          plan: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bebas text-white mb-6">
            Свяжитесь с <span className="text-blue-400">нами</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Есть вопросы? Хотите подключиться? Мы поможем вам выбрать подходящий тариф и настроить VPN.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20, scale: 0.98 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1.0, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700"
          >
            <h3 className="text-2xl font-bebas text-white mb-6">
              Отправить заявку
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Имя *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Ваше имя"
                />
              </div>

              <div>
                <label htmlFor="plan" className="block text-sm font-medium text-gray-300 mb-2">
                  Интересующий тариф
                </label>
                <select
                  id="plan"
                  name="plan"
                  value={formData.plan}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="">Выберите тариф</option>
                  {plans.map((plan) => (
                    <option key={plan.value} value={plan.value}>
                      {plan.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Сообщение
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                  placeholder="Расскажите о ваших потребностях..."
                />
              </div>

              {/* Submit Status */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center p-4 bg-green-600/10 border border-green-600/20 rounded-lg text-green-400"
                >
                  <CheckCircle className="w-5 h-5 mr-3" />
                  Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center p-4 bg-red-600/10 border border-red-600/20 rounded-lg text-red-400"
                >
                  <AlertCircle className="w-5 h-5 mr-3" />
                  Произошла ошибка при отправке заявки. Попробуйте еще раз.
                </motion.div>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                size="lg"
              >
                {isSubmitting ? (
                  <>
                    <LoadingSpinner size="md" color="white" className="mr-2" />
                    Отправляем...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Отправить заявку
                  </>
                )}
              </Button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.98 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1.0, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bebas text-white mb-6">
                Способы связи
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4 p-6 bg-slate-800/50 rounded-xl border border-slate-700">
                  <div className="p-3 bg-blue-600/20 rounded-lg">
                    <MessageCircle className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">
                      Telegram бот
                    </h4>
                    <p className="text-gray-300 mb-3">
                      Быстрое подключение и настройка через нашего бота
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open('https://t.me/maxvpn_offbot', '_blank')}
                    >
                      @maxvpn_offbot
                    </Button>
                  </div>
                </div>

              </div>
            </div>

            {/* Quick Connect */}
            <div className="p-8 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-blue-600/10 rounded-2xl border border-blue-600/20 backdrop-blur-sm">
              <h4 className="text-xl font-bebas text-white mb-4">
                Быстрое подключение
              </h4>
              <p className="text-gray-300 mb-6">
                Хотите подключиться прямо сейчас? Используйте нашего Telegram бота для мгновенной настройки.
              </p>
              <Button
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-blue-500/25 hover:scale-105 transition-all duration-300"
                onClick={() => window.open('https://t.me/maxvpn_offbot', '_blank')}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Подключиться через бота
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
