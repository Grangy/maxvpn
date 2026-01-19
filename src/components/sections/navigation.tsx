'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X, Zap } from 'lucide-react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Преимущества', href: '#features' },
    { name: 'Тарифы', href: '#pricing' },
    { name: 'Поддержка', href: '#support' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 ${
      isScrolled 
        ? 'bg-slate-950/95 backdrop-blur-md border-b border-slate-800' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2" aria-label="MaxGroot - Главная страница">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg overflow-hidden">
              <Image src="/logo-rounded.png" alt="MaxGroot Logo" width={40} height={40} className="object-cover" priority />
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-2xl font-bebas text-white">Max</span>
              <span className="text-2xl font-bebas text-blue-400">Groot</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => window.open('https://t.me/maxvpn_offbot', '_blank')}
            >
              <Zap className="w-4 h-4 mr-2" />
              Подключиться
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white transition-colors duration-200"
              aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden" role="navigation" aria-label="Мобильное меню">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-slate-900/95 backdrop-blur-md rounded-lg mt-2 border border-slate-800 z-[1001]">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-slate-800 rounded-md transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                  aria-label={`Перейти к разделу ${item.name}`}
                >
                  {item.name}
                </a>
              ))}
              <div className="pt-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    window.open('https://t.me/maxvpn_offbot', '_blank');
                    setIsOpen(false);
                  }}
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Подключиться
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
