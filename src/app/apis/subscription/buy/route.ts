import { NextRequest, NextResponse } from 'next/server';
import { buySubscription } from '@/lib/api';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    let { telegramId, planId } = body;

    if (!planId) {
      return NextResponse.json(
        { ok: false, error: 'planId is required' },
        { status: 400 }
      );
    }

    // Если telegramId не указан, используем дефолтный
    if (!telegramId) {
      telegramId = '683203214';
      console.log('⚠️ telegramId not provided, using default:', telegramId);
    }

    const result = await buySubscription(telegramId, planId);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error buying subscription:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to buy subscription';
    
    // Handle specific API errors
    if (errorMessage.includes('INSUFFICIENT_BALANCE')) {
      return NextResponse.json(
        { ok: false, error: 'INSUFFICIENT_BALANCE', message: 'Недостаточно средств на балансе' },
        { status: 400 }
      );
    }
    
    if (errorMessage.includes('INVALID_PLAN')) {
      return NextResponse.json(
        { ok: false, error: 'INVALID_PLAN', message: 'Неверный тарифный план' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { ok: false, error: errorMessage },
      { status: 500 }
    );
  }
}
