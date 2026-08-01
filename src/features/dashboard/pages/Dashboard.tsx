import { Link } from 'react-router-dom';
import { RecentActivity } from '../components/RecentActivity';

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Overview</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Welcome back! Here's the latest activity across your pages.</p>
        </div>
        <Link
          to="/dashboard/html-chunk"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          HTML Chunk Page
        </Link>
      </div>

      <RecentActivity />
    </div>
  );
}
