#!/bin/bash

echo "🚀 Быстрый запуск MaxVPN Demo..."
echo "================================"

# Проверяем ngrok
if ! command -v ngrok &> /dev/null; then
    echo "❌ ngrok не установлен. Установите: brew install ngrok/ngrok/ngrok"
    exit 1
fi

# Очищаем предыдущие сеансы
echo "🧹 Очистка предыдущих сеансов..."
pkill -f ngrok 2>/dev/null || true
lsof -ti:3000 | xargs kill -9 2>/dev/null || true
sleep 2

# Установка зависимостей
echo "📦 Установка зависимостей..."
npm install

# Запуск в dev режиме
echo "🌐 Запуск Next.js в режиме разработки..."
npm run dev &
NEXT_PID=$!

# Ждем запуска
echo "⏳ Ожидание запуска сервера..."
sleep 8

# Проверяем, что сервер запустился
if curl -s http://localhost:3000 > /dev/null; then
    echo "✅ Сервер запущен!"
    echo ""
    echo "🔗 Запуск ngrok туннеля..."
    echo "================================"
    echo "📱 Демо доступно по ссылкам:"
    echo "   🌐 Локально: http://localhost:3000"
    echo "   🌍 Публично: (ссылка появится ниже)"
    echo ""
    echo "💡 Нажмите Ctrl+C для завершения"
    echo ""
    
    # Запускаем ngrok
    ngrok http 3000
else
    echo "❌ Сервер не запустился. Проверьте ошибки выше."
    kill $NEXT_PID 2>/dev/null
    exit 1
fi

# Очистка при завершении
trap 'echo ""; echo "🛑 Завершение работы..."; kill $NEXT_PID 2>/dev/null; echo "✅ Демо завершено!"' EXIT
