# MaxVPN - Современный лендинг VPN сервиса

Современный лендинг для MaxVPN с темной темой, анимациями и интеграцией с Telegram ботом.

## 🚀 Технологии

- **Next.js 15** - React фреймворк с App Router
- **TypeScript** - типизированный JavaScript
- **Tailwind CSS** - utility-first CSS фреймворк
- **Framer Motion** - анимации и переходы
- **Lucide React** - иконки
- **Headless UI** - доступные компоненты

## 🎨 Особенности дизайна

- **Темная тема** - современный черный дизайн
- **Шрифт Bebas Neue** - стильный заголовочный шрифт
- **Анимации** - плавные переходы и эффекты
- **Адаптивность** - отлично работает на всех устройствах
- **Производительность** - оптимизирован для быстрой загрузки

## 📱 Функциональность

- **Hero секция** - привлекательный главный экран с CTA
- **Преимущества** - детальное описание возможностей
- **Тарифы** - гибкая система ценообразования
- **Форма обратной связи** - интеграция с Telegram
- **Попапы** - модальные окна для быстрого подключения
- **SEO оптимизация** - полная настройка для поисковиков

## 🛠 Установка и запуск

### Предварительные требования

- Node.js 18+ 
- npm или yarn

### Установка

1. Клонируйте репозиторий:
```bash
git clone <repository-url>
cd maxvpn
```

2. Установите зависимости:
```bash
npm install
```

3. Настройте переменные окружения:
```bash
cp env.example .env.local
```

Отредактируйте `.env.local`:
```env
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_SITE_NAME=MaxVPN
```

### Запуск

**Режим разработки:**
```bash
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000) в браузере.

**Продакшн сборка:**
```bash
npm run build
npm start
```

**🌍 Публичная демонстрация:**
```bash
# Быстрый запуск с ngrok
./quick-demo.sh
```

Подробные инструкции по демо в [LAUNCH_DEMO.md](LAUNCH_DEMO.md).

## 📁 Структура проекта

```
src/
├── app/                    # App Router (Next.js 13+)
│   ├── api/               # API routes
│   │   └── contact/       # Обработка форм
│   ├── globals.css        # Глобальные стили
│   ├── layout.tsx         # Основной layout
│   └── page.tsx           # Главная страница
├── components/            # React компоненты
│   ├── sections/         # Секции страницы
│   │   ├── navigation.tsx
│   │   ├── hero.tsx
│   │   ├── features.tsx
│   │   ├── pricing.tsx
│   │   ├── contact.tsx
│   │   └── footer.tsx
│   └── ui/               # UI компоненты
│       ├── button.tsx
│       ├── modal.tsx
│       └── quick-connect-modal.tsx
└── lib/                  # Утилиты
    └── utils.ts
```

## 🎨 Кастомизация

### Цвета
Основные цвета определены в `tailwind.config.ts`:
- `primary-*` - основные цвета бренда
- `dark-*` - темные оттенки
- `gray-*` - серые оттенки

### Шрифты
- **Bebas Neue** - для заголовков
- **Inter** - для основного текста

### Анимации
Используется Framer Motion для:
- Появления элементов при скролле
- Hover эффектов
- Переходов между состояниями

## 📊 SEO настройки

- Мета-теги для всех страниц
- Open Graph для соцсетей
- Twitter Cards
- Структурированные данные
- Sitemap (автоматически)
- Robots.txt

## 🔧 API интеграции

### Telegram Bot
Формы отправляются в Telegram через API:
```typescript
// POST /api/contact
{
  "name": "string",
  "email": "string", 
  "phone": "string",
  "message": "string",
  "plan": "string"
}
```

## 🚀 Деплой

### Vercel (рекомендуется)
1. Подключите GitHub репозиторий к Vercel
2. Настройте переменные окружения
3. Деплой произойдет автоматически

### Другие платформы
- **Netlify** - аналогично Vercel
- **Railway** - для полного контроля
- **DigitalOcean** - VPS решение

## 📈 Аналитика

Добавьте Google Analytics:
```env
NEXT_PUBLIC_GA_ID=your_ga_id
```

## 🎯 Оптимизация

- **Изображения** - используйте Next.js Image
- **Шрифты** - оптимизированы через Google Fonts
- **CSS** - Tailwind CSS с purge
- **JavaScript** - код-сплиттинг автоматически
- **Кэширование** - настроено для статических ресурсов

## 🐛 Отладка

### Логи
```bash
npm run dev -- --debug
```

### Проверка типов
```bash
npm run type-check
```

### Линтинг
```bash
npm run lint
```

## 📝 Лицензия

MIT License - используйте свободно для коммерческих проектов.

## 🤝 Поддержка

- **Telegram**: @maxvpn_offbot
- **Email**: info@maxvpn.com
- **Issues**: GitHub Issues

---

Создано с ❤️ для MaxVPN