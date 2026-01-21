import { NextResponse } from 'next/server';
import { getPlans } from '@/lib/api';

export async function GET() {
  try {
    // Check if API_SECRET is configured
    const apiSecret = process.env.API_SECRET;
    if (!apiSecret) {
      console.error('API_SECRET is not configured in environment variables');
      return NextResponse.json(
        { ok: false, error: 'API_SECRET is not configured on server' },
        { status: 500 }
      );
    }

    const plans = await getPlans();
    return NextResponse.json(plans, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    console.error('Error fetching plans:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch plans';
    
    // Check if it's a 401 error (Unauthorized)
    if (errorMessage.includes('401') || errorMessage.includes('Unauthorized')) {
      return NextResponse.json(
        { 
          ok: false, 
          error: 'API authentication failed. Please check API_SECRET in server environment variables.' 
        },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { ok: false, error: errorMessage },
      { status: 500 }
    );
  }
}
