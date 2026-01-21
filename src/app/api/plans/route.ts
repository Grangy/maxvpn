import { NextResponse } from 'next/server';
import { getPlans } from '@/lib/api';

export async function GET() {
  try {
    // Check if API_SECRET is configured
    const apiSecret = process.env.API_SECRET;
    const apiUrl = process.env.API_URL || 'https://grangy.ru/api';
    
    if (!apiSecret) {
      console.error('❌ API_SECRET is not configured in environment variables');
      console.error('Available env vars:', Object.keys(process.env).filter(k => k.includes('API')).join(', '));
      return NextResponse.json(
        { 
          ok: false, 
          error: 'API_SECRET is not configured on server. Please check .env.local file and restart the application.' 
        },
        { status: 500 }
      );
    }

    console.log(`✅ API_SECRET configured (length: ${apiSecret.length}), API_URL: ${apiUrl}`);

    const plans = await getPlans();
    return NextResponse.json(plans, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    console.error('❌ Error fetching plans:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch plans';
    
    // Check if it's a 401 error (Unauthorized)
    if (errorMessage.includes('401') || errorMessage.includes('Unauthorized') || (error as Error & { status?: number })?.status === 401) {
      console.error('❌ API Authentication Error (401)');
      console.error('API_SECRET configured:', !!process.env.API_SECRET);
      console.error('API_SECRET length:', process.env.API_SECRET?.length || 0);
      console.error('API_URL:', process.env.API_URL || 'https://grangy.ru/api');
      
      return NextResponse.json(
        { 
          ok: false, 
          error: 'API authentication failed. Please check API_SECRET in server environment variables and ensure it matches the API server configuration.' 
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
