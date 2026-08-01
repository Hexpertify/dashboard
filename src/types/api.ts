export interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
  success: boolean;
  meta?: ResponseMeta;
}

export interface ResponseMeta {
  page?: number;
  limit?: number;
  total?: number;
  totalPages?: number;
}

export interface ApiError {
  message: string;
  code?: string;
  status: number;
  details?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
  items: T[];
  meta: ResponseMeta;
}

export interface RequestConfig {
  params?: Record<string, unknown>;
  headers?: Record<string, string>;
  signal?: AbortSignal;
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface EndpointConfig {
  method: HttpMethod;
  path: string;
  requiresAuth?: boolean;
}