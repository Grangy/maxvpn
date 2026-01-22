import { NextRequest, NextResponse } from 'next/server';

const BOT_TOKEN = process.env.BOT_TOKEN || '';
const BOT_USERNAME = 'maxvpn_offbot';

/**
 * Авторизация пользователя в боте после покупки
 * Отправляет сообщение пользователю в боте или создает deep link
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { telegramId, subscriptionId, planName } = body;

    if (!telegramId) {
      return NextResponse.json(
        { ok: false, error: 'telegramId is required' },
        { status: 400 }
      );
    }

    if (!BOT_TOKEN) {
      console.warn('BOT_TOKEN is not set');
      return NextResponse.json(
        { ok: false, error: 'Bot token not configured' },
        { status: 500 }
      );
    }

    // Создаем deep link для авторизации в боте
    // Формат: https://t.me/bot_username?start=START_PARAM
    const startParam = subscriptionId 
      ? `sub_${subscriptionId}` 
      : `auth_${telegramId}`;
    
    const deepLink = `https://t.me/${BOT_USERNAME}?start=${startParam}`;

    // Опционально: отправляем сообщение пользователю через Bot API
    try {
      const botApiUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
      const message = planName
        ? `🎉 Поздравляем! Ваша подписка "${planName}" успешно активирована!\n\nИспользуйте бота для управления подпиской.`
        : `🎉 Добро пожаловать! Ваш аккаунт успешно создан.\n\nИспользуйте бота для управления подпиской.`;

      await fetch(botApiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: telegramId,
          text: message,
          parse_mode: 'HTML',
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: 'Открыть бота',
                  url: deepLink,
                },
              ],
            ],
          },
        }),
      });
    } catch (error) {
      console.error('Error sending message to bot:', error);
      // Не критично, продолжаем
    }

    return NextResponse.json({
      ok: true,
      data: {
        deepLink,
        message: 'User authorized in bot',
      },
    });
  } catch (error) {
    console.error('Error authorizing user in bot:', error);
    return NextResponse.json(
      { ok: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
