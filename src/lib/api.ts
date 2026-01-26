/**
 * API utilities for MaxGroot Secure Connection API
 */

const API_URL = process.env.API_URL || 'https://grangy.ru/api';
const API_SECRET = process.env.API_SECRET || '';

if (!API_SECRET) {
  console.error('⚠️ API_SECRET is not set in environment variables');
  console.error('Please ensure API_SECRET is set in .env.local on the server');
}

/**
 * Get API secret from environment
 */
export function getApiSecret(): string {
  if (!API_SECRET) {
    const error = 'API_SECRET is not configured. Please set API_SECRET in .env.local on the server.';
    console.error(error);
    throw new Error(error);
  }
  return API_SECRET;
}

/**
 * Make a request to the MaxGroot Secure Connection API
 */
export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_URL}${endpoint}`;
  const secret = getApiSecret();

  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'X-Webapp-Secret': secret,
      ...options.headers,
    },
  });

  if (!response.ok) {
    let errorData;
    try {
      errorData = await response.json();
    } catch {
      errorData = { error: `API request failed: ${response.status} ${response.statusText}` };
    }
    
    const errorMessage = errorData.error || errorData.message || `API request failed: ${response.status} ${response.statusText}`;
    
    // Log more details for debugging
    if (response.status === 401) {
      console.error('API Authentication Error (401):');
      console.error('- Endpoint:', url);
      console.error('- API_SECRET configured:', !!API_SECRET);
      console.error('- API_SECRET length:', API_SECRET?.length || 0);
      console.error('- Response:', errorMessage);
    }
    
    const error = new Error(errorMessage);
    (error as Error & { status?: number }).status = response.status;
    throw error;
  }

  return response.json();
}

/**
 * Get user data
 */
export async function getUserData(telegramId: string) {
  return apiRequest<{
    ok: boolean;
    data: {
      id: number;
      telegramId: string;
      username: string;
      balance: number;
      createdAt: string;
      subscriptions: unknown[];
    };
  }>(`/user/${telegramId}`);
}

/**
 * Get user balance
 */
export async function getUserBalance(telegramId: string) {
  return apiRequest<{
    ok: boolean;
    data: { balance: number };
  }>(`/user/${telegramId}/balance`);
}

/**
 * Get user subscriptions
 */
export async function getUserSubscriptions(telegramId: string, active?: boolean) {
  const params = active !== undefined ? `?active=${active}` : '';
  return apiRequest<{
    ok: boolean;
    data: Array<{
      id: number;
      planId: string;
      planName: string;
      price: number;
      startDate: string;
      endDate: string;
      isActive: boolean;
      subscriptionUrl: string;
      subscriptionUrl2: string;
    }>;
  }>(`/user/${telegramId}/subscriptions${params}`);
}

/**
 * Get plans
 */
export async function getPlans() {
  return apiRequest<{
    ok: boolean;
    data: Array<{
      id: string;
      name: string;
      price: number;
      duration: number;
      description: string;
    }>;
  }>('/plans');
}

/**
 * Create topup order
 */
export async function createTopup(telegramId: string, amount: number) {
  return apiRequest<{
    ok: boolean;
    data: {
      orderId: string;
      paymentUrl: string;
      amount: number;
    };
  }>('/topup/create', {
    method: 'POST',
    body: JSON.stringify({ telegramId, amount }),
  });
}

/**
 * Check topup status
 */
export async function checkTopupStatus(orderId: string) {
  return apiRequest<{
    ok: boolean;
    data: {
      orderId: string;
      status: 'pending' | 'completed' | 'failed';
      amount: number;
      completedAt?: string;
    };
  }>(`/topup/${orderId}/status`);
}

/**
 * Buy subscription
 */
export async function buySubscription(telegramId: string, planId: string) {
  return apiRequest<{
    ok: boolean;
    data: {
      subscription: {
        id: number;
        planId: string;
        planName: string;
        price: number;
        startDate: string;
        endDate: string;
        isActive: boolean;
        subscriptionUrl: string;
        subscriptionUrl2: string;
      };
      newBalance: number;
      charged: number;
    };
  }>('/subscription/buy', {
    method: 'POST',
    body: JSON.stringify({ telegramId, planId }),
  });
}
