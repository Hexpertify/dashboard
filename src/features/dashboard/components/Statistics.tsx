import { useAppSelector } from '@/app/hooks';
import { DashboardCard } from './DashboardCard';
import { formatNumber } from '@/utils/helpers';

export function Statistics() {
  const stats = useAppSelector((state) => state.dashboard.stats);

  if (!stats) return null;

  const cards = [
    {
      title: 'Indexed Pages',
      value: formatNumber(stats.indexedPages),
      change: 12.5,
      trend: 'up' as const,
      accent: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
      ),
    },
    {
      title: 'Organic Traffic',
      value: formatNumber(stats.organicTraffic),
      change: 8.3,
      trend: 'up' as const,
      accent: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
    },
    {
      title: 'Keywords Tracked',
      value: formatNumber(stats.keywordsTracked),
      change: 15.7,
      trend: 'up' as const,
      accent: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
        </svg>
      ),
    },
    {
      title: 'Avg Position',
      value: stats.avgPosition.toFixed(1),
      change: 4.6,
      trend: 'up' as const,
      accent: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      {cards.map((card) => (
        <DashboardCard key={card.title} {...card} />
      ))}
    </div>
  );
}
