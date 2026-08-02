import { useAppSelector } from '@/app/hooks';
import { formatRelativeTime } from '@/utils/date';
import type { PageRecord } from '@/features/htmlChunk/types';

type ActivityType = 'create' | 'update' | 'publish' | 'restore';

interface ActivityItem {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  actor: string;
  timestamp: string;
  status: PageRecord['status'];
}

const TYPE_CONFIG: Record<ActivityType, { accent: string; icon: React.ReactNode }> = {
  create: {
    accent: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
    ),
  },
  update: {
    accent: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
        />
      </svg>
    ),
  },
  publish: {
    accent: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
      </svg>
    ),
  },
  restore: {
    accent: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
};

const STATUS_STYLES: Record<PageRecord['status'], string> = {
  published: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
  draft: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
  archived: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
};

function buildActivity(pages: PageRecord[]): ActivityItem[] {
  const items: ActivityItem[] = [];

  pages.forEach((page) => {
    items.push({
      id: `${page.id}-created`,
      type: 'create',
      title: 'Page created',
      description: page.title,
      actor: page.createdBy,
      timestamp: page.createdAt,
      status: page.status,
    });

    page.versions.forEach((version) => {
      if (version.summary === 'Initial page creation') return;

      let type: ActivityType = 'update';
      if (version.summary.startsWith('Restored to version')) type = 'restore';
      if (version.summary === 'Page published' || version.summary === 'Page re-published') type = 'publish';

      items.push({
        id: `${page.id}-v${version.version}`,
        type,
        title:
          type === 'restore'
            ? `Restored version ${version.version}`
            : type === 'publish'
              ? 'Page published'
              : 'Page updated',
        description: version.summary,
        actor: version.updatedBy,
        timestamp: version.updatedAt,
        status: page.status,
      });
    });
  });

  return items.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, 8);
}

export function RecentActivity() {
  const pages = useAppSelector((state) => state.htmlChunk.pages);
  const activity = buildActivity(pages);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h2>
        <span className="text-sm text-gray-500 dark:text-gray-400">{activity.length} events</span>
      </div>

      {activity.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">No activity yet.</p>
      ) : (
        <ol className="space-y-1">
          {activity.map((item) => {
            const config = TYPE_CONFIG[item.type];
            return (
              <li key={item.id} className="flex items-start gap-4 py-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0 last:pb-0">
                <span className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${config.accent}`}>
                  {config.icon}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      <span className="text-gray-500 dark:text-gray-400">{item.actor}</span> {item.title.toLowerCase()}
                    </p>
                    <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full capitalize ${STATUS_STYLES[item.status]}`}>
                      {item.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 truncate">{item.description}</p>
                </div>
                <span className="flex-shrink-0 text-xs text-gray-400 dark:text-gray-500">{formatRelativeTime(item.timestamp)}</span>
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
}
