/**
 * API utilities for MaxGroot VPN API
 */

const API_URL = process.env.API_URL || 'https://grangy.ru/api';
const API_SECRET = process.env.API_SECRET || '';

if (!API_SECRET) {
  console.warn('⚠️ API_SECRET is not set in environment variables');
}

/**
 * Get API secret from environment
 */
export function getApiSecret(): string {
  if (!API_SECRET) {
    throw new Error('API_SECRET is not configured');
  }
  return API_SECRET;
}

/**
 * Make a request to the MaxGroot VPN API
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
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(error.error || `API request failed: ${response.statusText}`);
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
