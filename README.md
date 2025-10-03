# 🚀 MaxVPN - Современный лендинг VPN сервиса

[![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.23-0055FF?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)

> Современный лендинг для MaxVPN с **квантовым шифрованием**, темной темой, анимациями и интеграцией с Telegram ботом.

## 🌟 Демо

### 🚀 Быстрый запуск с ngrok
```bash
# Клонируйте репозиторий
git clone https://github.com/Grangy/maxvpn.git
cd maxvpn

# Запустите демо
./demo.sh
```

**Результат**: Публичный URL для демонстрации (например: `https://abc123.ngrok.io`)

### 📱 Локальная разработка
```bash
npm install
npm run dev
# Откройте http://localhost:3000
```

## ✨ Особенности

### 🎨 Современный дизайн
- **Темная тема** с градиентными эффектами
- **Плавные анимации** (Framer Motion)
- **Адаптивный дизайн** для всех устройств
- **Квантовое шифрование** как основное УТП

### 🔧 Технологический стек
- **Next.js 15** с App Router
- **TypeScript** для типобезопасности
- **Tailwind CSS** для стилизации
- **Framer Motion** для анимаций
- **Lucide React** для иконок

### 📄 Страницы
- **Главная** (`/`) - Hero, Features, Pricing, Contact
- **Успешная оплата** (`/success`) - Красивая страница подтверждения
- **Неуспешная оплата** (`/fail`) - Страница ошибки с инструкциями
- **Политика конфиденциальности** (`/privacy`)
- **Условия использования** (`/terms`)

### 🤖 Интеграции
- **Telegram бот** для быстрого подключения
- **API маршруты** для обработки форм
- **ngrok** для публичной демонстрации

## 🚀 Быстрый старт

### Предварительные требования
- Node.js 18+
- npm или yarn
- ngrok (для демо)

### Установка
```bash
# 1. Клонируйте репозиторий
git clone https://github.com/Grangy/maxvpn.git
cd maxvpn

# 2. Установите зависимости
npm install

# 3. Настройте переменные окружения
cp env.example .env.local
```

### Запуск
```bash
# Режим разработки
npm run dev

# Публичная демонстрация
./demo.sh
```

## 📁 Структура проекта

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API маршруты
│   ├── success/           # Страница успешной оплаты
│   ├── fail/              # Страница неуспешной оплаты
│   ├── privacy/           # Политика конфиденциальности
│   ├── terms/             # Условия использования
│   └── globals.css        # Глобальные стили
├── components/            # React компоненты
│   ├── sections/         # Секции страницы
│   └── ui/               # UI компоненты
└── lib/                  # Утилиты
```

## 🎯 Основные улучшения

### ✨ Новые возможности
- 🔮 **Квантовое шифрование** вместо "50+ стран"
- 📱 **Страницы оплаты** с красивыми анимациями
- 📄 **Юридические страницы** (политика, условия)
- 🤖 **Только Telegram** (убраны телефон/email)

### 🎨 Дизайн
- 🌈 **Градиентные фоны** и кнопки
- ✨ **Улучшенные анимации** с задержками
- 🎭 **Современные эффекты** (размытие, свечение)
- 📱 **Адаптивность** для всех устройств

### 🔧 Технические улучшения
- 🛠️ **Исправлены ошибки** TypeScript и ESLint
- 🔗 **Улучшен компонент Button** с поддержкой asChild
- 📦 **Оптимизирована сборка** проекта
- 🌍 **Настроен ngrok** для демонстрации

## 🛠️ Скрипты

```bash
# Разработка
npm run dev              # Запуск в режиме разработки
npm run build           # Сборка для продакшена
npm run start           # Запуск продакшн версии

# Демо
./demo.sh               # Запуск демо с ngrok
```

## 📚 Документация

Основная документация находится в README.md. Для запуска демо используйте `./demo.sh`.

## 🔧 Устранение проблем

### ngrok ошибки
```bash
# Если ngrok не работает, очистите процессы и запустите заново
pkill -f ngrok
lsof -ti:3000 | xargs kill -9
./demo.sh
```

### Ошибки сборки
```bash
# Очистите кэш
rm -rf .next node_modules
npm install
```

## 📊 Статистика

- **39 файлов** изменено
- **5392 строки** добавлено
- **752 строки** удалено
- **5 новых страниц** создано
- **10+ улучшений** дизайна

## 🤝 Участие в разработке

1. Fork репозитория
2. Создайте ветку для функции (`git checkout -b feature/AmazingFeature`)
3. Зафиксируйте изменения (`git commit -m 'Add some AmazingFeature'`)
4. Отправьте в ветку (`git push origin feature/AmazingFeature`)
5. Откройте Pull Request

## 📄 Лицензия

Этот проект лицензирован под Eclipse Public License 2.0 - см. файл [LICENSE](LICENSE) для деталей.

## 📞 Поддержка

- **Telegram**: [@maxvpn_offbot](https://t.me/maxvpn_offbot)
- **GitHub Issues**: [Создать issue](https://github.com/Grangy/maxvpn/issues)

---

**Создано с ❤️ для MaxVPN**

⭐ **Поставьте звезду, если проект вам понравился!**
