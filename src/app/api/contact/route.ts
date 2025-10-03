import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message, plan } = body;

    // Validate required fields
    if (!name || !phone) {
      return NextResponse.json(
        { error: 'Имя и телефон обязательны' },
        { status: 400 }
      );
    }

    // Prepare message for Telegram
    const telegramMessage = `
🆕 Новая заявка с сайта MaxVPN

👤 Имя: ${name}
📞 Телефон: ${phone}
📧 Email: ${email || 'Не указан'}
📋 Тариф: ${plan || 'Не выбран'}
💬 Сообщение: ${message || 'Не указано'}

⏰ Время: ${new Date().toLocaleString('ru-RU')}
    `.trim();

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
