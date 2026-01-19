import { NextResponse } from 'next/server';
import { getPlans } from '@/lib/api';

export async function GET() {
  try {
    const plans = await getPlans();
    return NextResponse.json(plans, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    console.error('Error fetching plans:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch plans';
    return NextResponse.json(
      { ok: false, error: errorMessage },
      { status: 500 }
    );
  }
}
