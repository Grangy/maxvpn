/**
 * Telegram WebApp utilities
 */

declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        initData: string;
        initDataUnsafe: {
          user?: {
            id: number;
            first_name?: string;
            last_name?: string;
            username?: string;
          };
        };
        ready: () => void;
        expand: () => void;
        close: () => void;
      };
    };
  }
}

/**
 * Check if running in Telegram WebApp
 */
export function isTelegramWebApp(): boolean {
  if (typeof window === 'undefined') return false;
  return typeof window.Telegram !== 'undefined' && window.Telegram.WebApp !== undefined;
}

/**
 * Get Telegram user data from WebApp
 */
export function getTelegramUser() {
  if (!isTelegramWebApp()) return null;
  return window.Telegram?.WebApp.initDataUnsafe.user || null;
}

/**
 * Get Telegram user ID
 */
export function getTelegramUserId(): string | null {
  const user = getTelegramUser();
  return user ? String(user.id) : null;
}

/**
 * Initialize Telegram WebApp
 */
export function initTelegramWebApp() {
  if (isTelegramWebApp() && window.Telegram?.WebApp) {
    window.Telegram.WebApp.ready();
    window.Telegram.WebApp.expand();
  }
}

/**
 * Generate temporary user ID for anonymous purchases
 */
export function generateTempUserId(): string {
  return `temp_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Get or create temporary user ID from localStorage
 */
export function getOrCreateTempUserId(): string {
  if (typeof window === 'undefined') return generateTempUserId();
  
  const stored = localStorage.getItem('temp_user_id');
  if (stored) return stored;
  
  const newId = generateTempUserId();
  localStorage.setItem('temp_user_id', newId);
  return newId;
}

/**
 * Store purchase data in localStorage
 */
export function storePurchaseData(data: {
  orderId?: string;
  subscriptionId?: string;
  subscriptionUrl?: string;
  subscriptionUrl2?: string;
  planName?: string;
  endDate?: string;
  planId?: string;
  amount?: number;
}) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('pending_purchase', JSON.stringify(data));
}

/**
 * Get stored purchase data
 */
export function getStoredPurchaseData() {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem('pending_purchase');
  return stored ? JSON.parse(stored) : null;
}

/**
 * Clear stored purchase data
 */
export function clearStoredPurchaseData() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('pending_purchase');
}
