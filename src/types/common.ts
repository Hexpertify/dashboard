import type { ReactNode } from 'react';

export type JSONValue = string | number | boolean | null | JSONObject | JSONArray;
export interface JSONObject { [key: string]: JSONValue; }
export interface JSONArray extends Array<JSONValue> {}

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

export type Nullable<T> = T | null;

export type AsyncState<T> = {
  data: T | null;
  loading: boolean;
  error: Error | null;
};

export type SelectOption<T = string> = {
  value: T;
  label: string;
  disabled?: boolean;
  icon?: ReactNode;
};

export type SortDirection = 'asc' | 'desc';

export type SortConfig<T = string> = {
  key: T;
  direction: SortDirection;
};

export type FilterOperator = 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte' | 'contains' | 'startsWith' | 'endsWith' | 'in' | 'notIn';

export type FilterConfig<T = string> = {
  field: T;
  operator: FilterOperator;
  value: unknown;
};

export type PaginationParams = {
  page: number;
  limit: number;
  sort?: SortConfig;
  filters?: FilterConfig[];
};

export type EntityBase = {
  id: string;
  createdAt: string;
  updatedAt: string;
};

export type SoftDeleteEntity = EntityBase & {
  deletedAt: string | null;
};