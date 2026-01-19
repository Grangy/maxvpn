'use client';

import React from 'react';
import Image from 'next/image';
import { Shield, MessageCircle, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    product: [
      { name: 'Преимущества', href: '#features' },
      { name: 'Тарифы', href: '#pricing' },
      { name: 'Технологии', href: '#features' },
      { name: 'Поддержка', href: '#contact' },
    ],
    support: [
      { name: 'Telegram бот', href: 'https://t.me/maxvpn_offbot', external: true },
      { name: 'Инструкции', href: '#', external: false },
      { name: 'FAQ', href: '#', external: false },
      { name: 'Контакты', href: '#contact', external: false },
    ],
    legal: [
      { name: 'Политика конфиденциальности', href: '/privacy', external: false },
      { name: 'Условия использования', href: '/terms', external: false },
      { name: 'Возврат средств', href: '#', external: false },
    ]
  };

  return (
    <footer className="bg-gradient-to-t from-slate-950 via-slate-900 to-slate-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-2 mb-6">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg overflow-hidden">
                  <Image src="/logo-rounded.png" alt="MaxGroot Logo" width={40} height={40} className="object-cover" />
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-2xl font-bebas text-white">Max</span>
                  <span className="text-2xl font-bebas text-blue-400">Groot</span>
                </div>
              </div>
              
              <p className="text-gray-400 mb-6 leading-relaxed">
                Защита цифровой жизни с Kaspersky Secure Connection. Надёжное шифрование для защиты 
                приватности и конфиденциальной информации. Доступ к глобальному контенту.
              </p>

              <div className="space-y-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open('https://t.me/maxvpn_offbot', '_blank')}
                  className="w-full justify-start border-blue-600/50 text-blue-400 hover:bg-blue-600 hover:text-white hover:scale-105 transition-all duration-300"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  @maxvpn_offbot
                </Button>
              </div>
            </div>

            {/* Product Links */}
            <div>
              <h3 className="text-lg font-bebas text-white mb-6">
                Продукт
              </h3>
              <ul className="space-y-3">
                {footerLinks.product.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h3 className="text-lg font-bebas text-white mb-6">
                Поддержка
              </h3>
              <ul className="space-y-3">
                {footerLinks.support.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                      className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-bebas text-white mb-6">
                Контакты
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-gray-400">
                  <MessageCircle className="w-5 h-5 text-blue-400" />
                  <a 
                    href="https://t.me/maxvpn_offbot" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-blue-400 transition-colors duration-200"
                  >
                    @maxvpn_offbot
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {new Date().getFullYear()} MaxGroot. Все права защищены.
            </div>
            
            <div className="flex items-center space-x-6">
              {footerLinks.legal.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Scroll to Top */}
            <Button
              variant="ghost"
              size="sm"
              onClick={scrollToTop}
              className="text-gray-400 hover:text-white"
            >
              <ArrowUp className="w-4 h-4 mr-2" />
              Наверх
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
