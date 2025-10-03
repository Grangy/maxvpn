#!/bin/bash

# MaxVPN Demo Script
# Этот скрипт запускает проект в демо-режиме с ngrok

echo "🚀 Запуск MaxVPN Demo..."
echo "================================"

# Проверяем, установлен ли ngrok
if ! command -v ngrok &> /dev/null; then
    echo "❌ ngrok не установлен. Установите ngrok:"
    echo "   brew install ngrok/ngrok/ngrok"
    echo "   или скачайте с https://ngrok.com/"
    exit 1
fi

# Проверяем, есть ли токен ngrok
if [ -z "$NGROK_AUTHTOKEN" ]; then
    echo "⚠️  NGROK_AUTHTOKEN не установлен."
    echo "   Получите токен на https://dashboard.ngrok.com/get-started/your-authtoken"
    echo "   и установите: export NGROK_AUTHTOKEN=your_token_here"
    echo ""
    echo "   Запускаем без токена (ограниченная версия)..."
fi

echo "📦 Установка зависимостей..."
npm install

echo "🔨 Сборка проекта..."
npm run build

echo "🌐 Запуск сервера..."
npm start &
SERVER_PID=$!

echo "⏳ Ожидание запуска сервера..."
sleep 5

echo "🔗 Запуск ngrok туннеля..."
echo "================================"
echo "📱 Демо будет доступно по ссылке ниже:"
echo ""

# Запускаем ngrok
ngrok http 3000

# Очистка при завершении
echo ""
echo "🛑 Завершение работы..."
kill $SERVER_PID 2>/dev/null
echo "✅ Демо завершено!"
