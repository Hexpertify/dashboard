export const APP_NAME = 'Dashboard';
export const APP_VERSION = '2.1.0';
export const APP_DESCRIPTION = 'Modern React dashboard template with TypeScript and Redux Toolkit';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  DASHBOARD: '/dashboard',
  USERS: '/dashboard/users',
  SETTINGS: '/dashboard/settings',
  PROFILE: '/dashboard/settings/profile',
  ACCOUNT: '/dashboard/settings/account',
  PREFERENCES: '/dashboard/settings/preferences',
  SEO: '/dashboard/settings/seo',
  UNAUTHORIZED: '/unauthorized',
} as const;

export const STORAGE_KEYS = {
  THEME: 'theme',
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_PREFERENCES: 'user_preferences',
  SIDEBAR_COLLAPSED: 'sidebar_collapsed',
} as const;

export const THEMES = ['light', 'dark', 'system'] as const;
export type Theme = typeof THEMES[number];

export const DATE_FORMATS = {
  SHORT: 'MM/dd/yyyy',
  LONG: 'MMMM d, yyyy',
  ISO: "yyyy-MM-dd'T'HH:mm:ss.SSSxxx",
  TIME: 'HH:mm',
  DATETIME: 'MM/dd/yyyy HH:mm',
} as const;

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  LIMIT_OPTIONS: [10, 25, 50, 100],
} as const;

export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 8,
  NAME_MAX_LENGTH: 50,
  EMAIL_MAX_LENGTH: 254,
  BIO_MAX_LENGTH: 500,
  META_TITLE_MAX: 70,
  META_DESCRIPTION_MAX: 180,
  OG_TITLE_MAX: 90,
  OG_DESCRIPTION_MAX: 200,
} as const;

export const REGEX = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  URL: /^https?:\/\/.+/,
  PASSWORD_UPPERCASE: /[A-Z]/,
  PASSWORD_LOWERCASE: /[a-z]/,
  PASSWORD_NUMBER: /[0-9]/,
  PASSWORD_SPECIAL: /[^A-Za-z0-9]/,
  SLUG: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
} as const;

export const QUERY_KEYS = {
  AUTH: ['auth'],
  USER: ['user'],
  USERS: ['users'],
  DASHBOARD: ['dashboard'],
  SETTINGS: ['settings'],
} as const;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
} as const;