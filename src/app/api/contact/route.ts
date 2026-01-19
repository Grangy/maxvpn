import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { telegram, email, phone, message, plan } = body;
    
    console.log('Contact form data:', { telegram, email, phone, message, plan });

    // Validate required fields
    if (!telegram) {
      return NextResponse.json(
        { error: 'Telegram обязателен' },
        { status: 400 }
      );
    }

    // Prepare message for Telegram
    const telegramMessage = `
🆕 Новая заявка с сайта MaxGroot

📱 Telegram: ${telegram}
📞 Телефон: ${phone || 'Не указан'}
📧 Email: ${email || 'Не указан'}
📋 Тариф: ${plan || 'Не выбран'}
💬 Сообщение: ${message || 'Не указано'}

⏰ Время: ${new Date().toLocaleString('ru-RU')}
    `.trim();

    // Check if Telegram is configured
    if (!process.env.TELEGRAM_BOT_TOKEN || !process.env.TELEGRAM_CHAT_ID) {
      console.log('Telegram not configured, skipping notification');
      return NextResponse.json(
        { message: 'Заявка получена (Telegram не настроен)' },
        { status: 200 }
      );
    }

    // Send to Telegram
    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: process.env.TELEGRAM_CHAT_ID,
          text: telegramMessage,
          parse_mode: 'HTML',
        }),
      }
    );

    if (!telegramResponse.ok) {
      console.error('Telegram API error:', await telegramResponse.text());
      return NextResponse.json(
        { error: 'Ошибка отправки в Telegram' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Заявка успешно отправлена' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
}
