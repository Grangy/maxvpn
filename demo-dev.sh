#!/bin/bash

# MaxVPN Demo Script (Development Mode)
# Быстрый запуск для разработки с hot-reload

echo "🚀 Запуск MaxVPN Demo (Development Mode)..."
echo "============================================"

# Проверяем, установлен ли ngrok
if ! command -v ngrok &> /dev/null; then
    echo "❌ ngrok не установлен. Установите ngrok:"
    echo "   brew install ngrok/ngrok/ngrok"
    exit 1
fi

# Функция для очистки при завершении
cleanup() {
    echo ""
    echo "🛑 Завершение работы..."
    if [ ! -z "$NEXT_PID" ]; then
        kill $NEXT_PID 2>/dev/null
        echo "✅ Next.js сервер остановлен"
    fi
    if [ ! -z "$NGROK_PID" ]; then
        kill $NGROK_PID 2>/dev/null
        echo "✅ ngrok туннель закрыт"
    fi
    exit 0
}

# Устанавливаем обработчик сигналов
trap cleanup SIGINT SIGTERM

echo "📦 Установка зависимостей..."
npm install

echo "🌐 Запуск Next.js в режиме разработки..."
npm run dev &
NEXT_PID=$!

echo "⏳ Ожидание запуска сервера..."
sleep 5

# Проверяем, что сервер запустился
if ! curl -s http://localhost:3000 > /dev/null; then
    echo "❌ Сервер не запустился. Проверьте ошибки выше."
    cleanup
fi

echo "🔗 Запуск ngrok туннеля..."
echo "================================"
echo "📱 Демо доступно по ссылкам:"
echo "   🌐 Локально: http://localhost:3000"
echo "   🌍 Публично: (ссылка появится ниже)"
echo ""
echo "💡 Нажмите Ctrl+C для завершения"
echo ""

# Запускаем ngrok в фоне
ngrok http 3000 &
NGROK_PID=$!

# Ждем завершения
wait
