import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

const BOT_TOKEN = process.env.BOT_TOKEN || '';

/**
 * Validate Telegram WebApp initData
 */
function validateTelegramInitData(initData: string): boolean {
  if (!BOT_TOKEN) {
    console.warn('BOT_TOKEN is not set');
    return false;
  }

  try {
    const urlParams = new URLSearchParams(initData);
    const hash = urlParams.get('hash');
    urlParams.delete('hash');

    // Sort and create data check string
    const dataCheckString = Array.from(urlParams.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, value]) => `${key}=${value}`)
      .join('\n');

    // Create secret key
    const secretKey = crypto
      .createHmac('sha256', 'WebAppData')
      .update(BOT_TOKEN)
      .digest();

    // Calculate hash
    const calculatedHash = crypto
      .createHmac('sha256', secretKey)
      .update(dataCheckString)
      .digest('hex');

    return calculatedHash === hash;
  } catch (error) {
    console.error('Error validating Telegram initData:', error);
    return false;
  }
}

/**
 * Parse Telegram user from initData
 */
function parseTelegramUser(initData: string) {
  try {
    const urlParams = new URLSearchParams(initData);
    const userStr = urlParams.get('user');
    if (!userStr) return null;
    return JSON.parse(userStr);
  } catch (error) {
    console.error('Error parsing Telegram user:', error);
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { initData } = body;

    if (!initData) {
      return NextResponse.json(
        { ok: false, error: 'initData is required' },
        { status: 400 }
      );
    }

    // Validate initData
    const isValid = validateTelegramInitData(initData);
    if (!isValid) {
      return NextResponse.json(
        { ok: false, error: 'Invalid initData' },
        { status: 401 }
      );
    }

    // Parse user data
    const user = parseTelegramUser(initData);
    if (!user || !user.id) {
      return NextResponse.json(
        { ok: false, error: 'Invalid user data' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      ok: true,
      data: {
        telegramId: String(user.id),
        username: user.username,
        firstName: user.first_name,
        lastName: user.last_name,
      },
    });
  } catch (error) {
    console.error('Error authenticating Telegram user:', error);
    return NextResponse.json(
      { ok: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
