import { NextRequest, NextResponse } from 'next/server';
import { checkTopupStatus } from '@/lib/api';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ orderId: string }> }
) {
  try {
    const params = await context.params;
    const { orderId } = params;
    
    if (!orderId) {
      return NextResponse.json(
        { ok: false, error: 'orderId is required' },
        { status: 400 }
      );
    }

    const result = await checkTopupStatus(orderId);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error checking topup status:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to check topup status';
    return NextResponse.json(
      { ok: false, error: errorMessage },
      { status: 500 }
    );
  }
}
