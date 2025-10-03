#!/bin/bash

echo "🧹 Очистка предыдущих сеансов..."
echo "================================"

# Убиваем все процессы ngrok
echo "🔄 Остановка ngrok..."
pkill -f ngrok 2>/dev/null || true

# Убиваем процессы на порту 3000
echo "🔄 Освобождение порта 3000..."
lsof -ti:3000 | xargs kill -9 2>/dev/null || true

# Ждем немного
sleep 2

echo "✅ Очистка завершена!"
echo ""
echo "🚀 Теперь можно запускать демо:"
echo "   ./quick-demo.sh"
echo ""
