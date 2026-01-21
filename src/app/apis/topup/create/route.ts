import { NextRequest, NextResponse } from 'next/server';
import { createTopup } from '@/lib/api';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { telegramId, amount } = body;

    if (!telegramId || !amount) {
      return NextResponse.json(
        { ok: false, error: 'telegramId and amount are required' },
        { status: 400 }
      );
    }

    if (typeof amount !== 'number' || amount <= 0) {
      return NextResponse.json(
        { ok: false, error: 'amount must be a positive number' },
        { status: 400 }
      );
    }

    const result = await createTopup(telegramId, amount);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error creating topup:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to create topup';
    return NextResponse.json(
      { ok: false, error: errorMessage },
      { status: 500 }
    );
  }
}
