import { STORAGE_KEYS } from './constants';

export function getStorageItem<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;

  try {
    const item = localStorage.getItem(key);
    if (item === null) return defaultValue;
    return JSON.parse(item) as T;
  } catch {
    return defaultValue;
  }
}

export function setStorageItem<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Failed to set storage item ${key}:`, error);
  }
}

export function removeStorageItem(key: string): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Failed to remove storage item ${key}:`, error);
  }
}

export function clearStorage(): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.clear();
  } catch (error) {
    console.error('Failed to clear storage:', error);
  }
}

export const storage = {
  getTheme: () => getStorageItem<string>(STORAGE_KEYS.THEME, 'system'),
  setTheme: (theme: string) => setStorageItem(STORAGE_KEYS.THEME, theme),

  getAuthToken: () => getStorageItem<string | null>(STORAGE_KEYS.AUTH_TOKEN, null),
  setAuthToken: (token: string) => setStorageItem(STORAGE_KEYS.AUTH_TOKEN, token),
  removeAuthToken: () => removeStorageItem(STORAGE_KEYS.AUTH_TOKEN),

  getRefreshToken: () => getStorageItem<string | null>(STORAGE_KEYS.REFRESH_TOKEN, null),
  setRefreshToken: (token: string) => setStorageItem(STORAGE_KEYS.REFRESH_TOKEN, token),
  removeRefreshToken: () => removeStorageItem(STORAGE_KEYS.REFRESH_TOKEN),

  getUserPreferences: () => getStorageItem<Record<string, unknown>>(STORAGE_KEYS.USER_PREFERENCES, {}),
  setUserPreferences: (prefs: Record<string, unknown>) => setStorageItem(STORAGE_KEYS.USER_PREFERENCES, prefs),

  getSidebarCollapsed: () => getStorageItem<boolean>(STORAGE_KEYS.SIDEBAR_COLLAPSED, false),
  setSidebarCollapsed: (collapsed: boolean) => setStorageItem(STORAGE_KEYS.SIDEBAR_COLLAPSED, collapsed),

  clearAuth: () => {
    removeStorageItem(STORAGE_KEYS.AUTH_TOKEN);
    removeStorageItem(STORAGE_KEYS.REFRESH_TOKEN);
  },
};

export function getSessionItem<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;

  try {
    const item = sessionStorage.getItem(key);
    if (item === null) return defaultValue;
    return JSON.parse(item) as T;
  } catch {
    return defaultValue;
  }
}

export function setSessionItem<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;

  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Failed to set session item ${key}:`, error);
  }
}

export function removeSessionItem(key: string): void {
  if (typeof window === 'undefined') return;

  try {
    sessionStorage.removeItem(key);
  } catch (error) {
    console.error(`Failed to remove session item ${key}:`, error);
  }
}