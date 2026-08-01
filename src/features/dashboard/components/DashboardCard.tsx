import type { ReactNode } from 'react';

interface DashboardCardProps {
  title: string;
  value: string;
  change?: number;
  trend?: 'up' | 'down' | 'neutral';
  icon?: ReactNode;
  accent?: string;
}

export function DashboardCard({ title, value, change, trend = 'neutral', icon, accent = 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' }: DashboardCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-11 h-11 rounded-lg flex items-center justify-center ${accent}`}>
          {icon}
        </div>
        {change !== undefined && (
          <span
            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
              trend === 'up'
                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                : trend === 'down'
                ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
            }`}
          >
            <svg
              className={`w-3 h-3 ${trend === 'down' ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 10l5 5 5-5" />
            </svg>
            {Math.abs(change)}%
          </span>
        )}
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{title}</p>
      <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
    </div>
  );
}