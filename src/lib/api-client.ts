/**
 * Client-side API utilities for MaxGroot
 * Все запросы идут через Next.js API routes (безопасно)
 */

const API_BASE = '/apis';

/**
 * Типы для API ответов
 */
export interface ApiResponse<T> {
  ok: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface Plan {
  id: string;
  name: string;
  price: number;
  duration: number;
  description: string;
  label?: string;
  months?: number;
  pricePerMonth?: number;
}

/**
 * Универсальная функция для API запросов с retry
 */
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {},
  retries = 3
): Promise<ApiResponse<T>> {
  // ВАЖНО: Всегда используем относительный путь через Next.js API routes
  // Это гарантирует, что запросы идут через сервер, а не напрямую к внешнему API
  const url = `${API_BASE}${endpoint}`;
  
  // Проверка, что мы не используем абсолютный URL (защита от ошибок)
  if (url.startsWith('http://') || url.startsWith('https://')) {
    console.error('❌ ОШИБКА: Используется абсолютный URL вместо относительного!', url);
    return {
      ok: false,
      error: 'CONFIGURATION_ERROR',
      message: 'Неправильная конфигурация API клиента',
    };
  }
  
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`[API Client] ${options.method || 'GET'} ${url} (попытка ${attempt}/${retries})`);
      
      // ВАЖНО: На клиенте ВСЕГДА используем относительный путь
      // Это гарантирует, что запрос идет через Next.js API route, а не напрямую к внешнему API
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        // Важно: не кэшируем запросы к API
        cache: 'no-store',
      });

      const data = await response.json();
      
      console.log(`[API Client] Ответ:`, { status: response.status, ok: response.ok, hasData: !!data });

      // Если успешный ответ
      if (response.ok && data.ok !== false) {
        return { ok: true, data: data.data || data };
      }

      // Если ошибка 401 и есть попытки - пробуем еще раз
      if (response.status === 401 && attempt < retries) {
        console.warn(`API request failed (401), retrying... (${attempt}/${retries})`);
        await new Promise(resolve => setTimeout(resolve, 1000 * attempt)); // Exponential backoff
        continue;
      }

      // Возвращаем ошибку
      return {
        ok: false,
        error: data.error || `HTTP ${response.status}`,
        message: data.message || data.error,
      };
    } catch (error) {
      // Если последняя попытка - возвращаем ошибку
      if (attempt === retries) {
        console.error('API request failed:', error);
        return {
          ok: false,
          error: 'NETWORK_ERROR',
          message: error instanceof Error ? error.message : 'Ошибка сети',
        };
      }
      
      // Иначе ждем и пробуем еще раз
      console.warn(`API request failed, retrying... (${attempt}/${retries})`);
      await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
    }
  }

  return {
    ok: false,
    error: 'MAX_RETRIES',
    message: 'Превышено количество попыток',
  };
}

/**
 * Получить список тарифных планов
 */
export async function getPlans(): Promise<ApiResponse<Plan[]>> {
  return apiRequest<Plan[]>('/plans');
}

/**
 * Купить подписку
 */
export async function buySubscription(
  telegramId: string,
  planId: string
): Promise<ApiResponse<{
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
}>> {
  return apiRequest('/subscription/buy', {
    method: 'POST',
    body: JSON.stringify({ telegramId, planId }),
  });
}

/**
 * Создать пополнение
 */
export async function createTopup(
  telegramId: string,
  amount: number
): Promise<ApiResponse<{
  topupId: number;
  orderId: string;
  amount: number;
  paymentUrl: string;
}>> {
  return apiRequest('/topup/create', {
    method: 'POST',
    body: JSON.stringify({ telegramId, amount }),
  });
}

/**
 * Проверить статус пополнения
 */
export async function checkTopupStatus(
  orderId: string
): Promise<ApiResponse<{
  orderId: string;
  status: 'pending' | 'completed' | 'failed';
  amount: number;
  completedAt?: string;
}>> {
  return apiRequest(`/topup/${orderId}/status`);
}
