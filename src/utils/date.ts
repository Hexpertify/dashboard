import { DATE_FORMATS } from './constants';

export type DateFormat = (typeof DATE_FORMATS)[keyof typeof DATE_FORMATS];

export function formatDate(date: Date | string | number, format: DateFormat = DATE_FORMATS.SHORT): string {
  const d = new Date(date);
  if (isNaN(d.getTime())) return 'Invalid date';

  const options: Intl.DateTimeFormatOptions = {};

  switch (format) {
    case DATE_FORMATS.SHORT:
      options.month = '2-digit';
      options.day = '2-digit';
      options.year = 'numeric';
      break;
    case DATE_FORMATS.LONG:
      options.month = 'long';
      options.day = 'numeric';
      options.year = 'numeric';
      break;
    case DATE_FORMATS.TIME:
      options.hour = '2-digit';
      options.minute = '2-digit';
      options.hour12 = false;
      break;
    case DATE_FORMATS.DATETIME:
      options.month = '2-digit';
      options.day = '2-digit';
      options.year = 'numeric';
      options.hour = '2-digit';
      options.minute = '2-digit';
      options.hour12 = false;
      break;
    default:
      return d.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
  }

  return d.toLocaleDateString('en-US', options);
}

export function formatRelativeTime(date: Date | string | number): string {
  const d = new Date(date);
  if (isNaN(d.getTime())) return 'Invalid date';

  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  const diffWeek = Math.floor(diffDay / 7);
  const diffMonth = Math.floor(diffDay / 30);
  const diffYear = Math.floor(diffDay / 365);

  if (diffSec < 60) return 'just now';
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHour < 24) return `${diffHour}h ago`;
  if (diffDay < 7) return `${diffDay}d ago`;
  if (diffWeek < 4) return `${diffWeek}w ago`;
  if (diffMonth < 12) return `${diffMonth}mo ago`;
  return `${diffYear}y ago`;
}

export function formatDateTime(date: Date | string | number): string {
  return formatDate(date, DATE_FORMATS.DATETIME);
}

export function formatTime(date: Date | string | number): string {
  return formatDate(date, DATE_FORMATS.TIME);
}

export function isToday(date: Date | string | number): boolean {
  const d = new Date(date);
  const today = new Date();
  return d.toDateString() === today.toDateString();
}

export function isYesterday(date: Date | string | number): boolean {
  const d = new Date(date);
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return d.toDateString() === yesterday.toDateString();
}

export function startOfDay(date: Date | string | number): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function endOfDay(date: Date | string | number): Date {
  const d = new Date(date);
  d.setHours(23, 59, 59, 999);
  return d;
}

export function startOfWeek(date: Date | string | number): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day;
  d.setDate(diff);
  return startOfDay(d);
}

export function endOfWeek(date: Date | string | number): Date {
  const d = startOfWeek(date);
  d.setDate(d.getDate() + 6);
  return endOfDay(d);
}

export function startOfMonth(date: Date | string | number): Date {
  const d = new Date(date);
  d.setDate(1);
  return startOfDay(d);
}

export function endOfMonth(date: Date | string | number): Date {
  const d = new Date(date);
  d.setMonth(d.getMonth() + 1, 0);
  return endOfDay(d);
}

export function addDays(date: Date | string | number, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

export function addMonths(date: Date | string | number, months: number): Date {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d;
}

export function differenceInDays(date1: Date | string | number, date2: Date | string | number): number {
  const d1 = startOfDay(new Date(date1));
  const d2 = startOfDay(new Date(date2));
  const diffMs = d1.getTime() - d2.getTime();
  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}

export function parseISODate(dateString: string): Date | null {
  const d = new Date(dateString);
  return isNaN(d.getTime()) ? null : d;
}

export function toISOString(date: Date | string | number): string {
  return new Date(date).toISOString();
}