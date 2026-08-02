import { Link, useParams } from 'react-router-dom';
import { useAppSelector } from '@/app/hooks';
import { PreviewFrame } from '../components/PreviewFrame';

export function PreviewPage() {
  const { id } = useParams<{ id: string }>();
  const page = useAppSelector((state) => state.htmlChunk.pages.find((p) => p.id === id));

  if (!page) {
    return (
      <div className="p-6 space-y-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Page not found</h1>
        <p className="text-gray-500 dark:text-gray-400">The page you're trying to preview doesn't exist.</p>
        <Link to="/dashboard/html-chunk" className="text-blue-600 dark:text-blue-400 hover:underline">
          Back to HTML Chunk Pages
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <nav className="text-sm text-gray-500 dark:text-gray-400 mb-2" aria-label="Breadcrumb">
            <Link to="/dashboard/html-chunk" className="hover:text-blue-600 dark:hover:text-blue-400">
              HTML Chunk Pages
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-700 dark:text-gray-300">Preview — {page.title}</span>
          </nav>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Preview Page</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            See how the page renders with the global header and footer across devices.
          </p>
        </div>
        <Link
          to={`/dashboard/html-chunk/${page.id}/edit`}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Edit Page
        </Link>
      </div>

      <PreviewFrame data={page} />
    </div>
  );
}
