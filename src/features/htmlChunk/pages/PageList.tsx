import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { deletePage, setPageStatus } from '../slice';
import { ConfirmModal } from '@/components/Modal';
import { PrimaryButton } from '@/components/Button';
import { formatDate } from '@/utils/date';
import type { PageRecord, PageStatus } from '../types';

type StatusFilter = 'all' | PageStatus;

const statusFilters: { value: StatusFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'draft', label: 'Draft' },
  { value: 'published', label: 'Published' },
  { value: 'archived', label: 'Archived' },
];

const statusBadge: Record<PageStatus, string> = {
  draft: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300',
  published: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
  archived: 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400',
};

export function PageList() {
  const dispatch = useAppDispatch();
  const pages = useAppSelector((state) => state.htmlChunk.pages);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [pageToDelete, setPageToDelete] = useState<PageRecord | null>(null);

  const filteredPages = useMemo(() => {
    const term = search.trim().toLowerCase();
    return pages.filter((page) => {
      if (statusFilter !== 'all' && page.status !== statusFilter) return false;
      if (!term) return true;
      return (
        page.title.toLowerCase().includes(term) ||
        page.identifierUrl.toLowerCase().includes(term)
      );
    });
  }, [pages, search, statusFilter]);

  const counts = useMemo(
    () => ({
      all: pages.length,
      draft: pages.filter((p) => p.status === 'draft').length,
      published: pages.filter((p) => p.status === 'published').length,
      archived: pages.filter((p) => p.status === 'archived').length,
    }),
    [pages]
  );

  const handleStatusChange = (page: PageRecord, status: PageStatus) => {
    dispatch(setPageStatus({ id: page.id, status, actor: 'John Doe' }));
    if (status === 'published') toast.success(`"${page.title}" published`);
    else if (status === 'draft') toast.success(`"${page.title}" unpublished`);
    else toast.success(`"${page.title}" archived`);
  };

  const confirmDelete = () => {
    if (pageToDelete) {
      dispatch(deletePage(pageToDelete.id));
      toast.success(`Page "${pageToDelete.title}" deleted`);
      setPageToDelete(null);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">HTML Chunk Pages</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Create and manage custom pages built from reusable HTML chunks ({filteredPages.length} pages)
          </p>
        </div>
        <PrimaryButton asChild>
          <Link to="/dashboard/html-chunk/create">Create New Page</Link>
        </PrimaryButton>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="inline-flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1" role="group" aria-label="Filter by status">
          {statusFilters.map((filter) => (
            <button
              key={filter.value}
              type="button"
              onClick={() => setStatusFilter(filter.value)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                statusFilter === filter.value
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
              aria-pressed={statusFilter === filter.value}
            >
              {filter.label} ({counts[filter.value]})
            </button>
          ))}
        </div>

        <div className="relative md:max-w-xs w-full">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title or identifier URL..."
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-400 dark:border-gray-500 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Search pages"
          />
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-400 dark:border-gray-500 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-gray-500 dark:text-gray-400 border-b border-gray-400 dark:border-gray-500">
                <th className="px-4 py-3 font-medium">Page Title</th>
                <th className="px-4 py-3 font-medium">Identifier URL</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Chunks</th>
                <th className="px-4 py-3 font-medium">Created</th>
                <th className="px-4 py-3 font-medium">Updated</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredPages.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-gray-500 dark:text-gray-400">
                    No pages found. Create your first HTML Chunk Page to get started.
                  </td>
                </tr>
              )}
              {filteredPages.map((page) => (
                <tr key={page.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                  <td className="px-4 py-3">
                    <Link
                      to={`/dashboard/html-chunk/${page.id}/edit`}
                      className="font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      {page.title}
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-gray-600 dark:text-gray-300">/{page.identifierUrl}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusBadge[page.status]}`}>
                      {page.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{page.chunks.length}</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{formatDate(page.createdAt)}</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{formatDate(page.updatedAt)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        to={`/dashboard/html-chunk/${page.id}/preview`}
                        className="px-2 py-1 text-xs font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                      >
                        Preview
                      </Link>
                      <Link
                        to={`/dashboard/html-chunk/${page.id}/edit`}
                        className="px-2 py-1 text-xs font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                      >
                        Edit
                      </Link>
                      {page.status !== 'published' && (
                        <button
                          type="button"
                          onClick={() => handleStatusChange(page, 'published')}
                          className="px-2 py-1 text-xs font-medium text-green-700 dark:text-green-400 hover:underline"
                        >
                          Publish
                        </button>
                      )}
                      {page.status === 'published' && (
                        <button
                          type="button"
                          onClick={() => handleStatusChange(page, 'draft')}
                          className="px-2 py-1 text-xs font-medium text-amber-700 dark:text-amber-400 hover:underline"
                        >
                          Unpublish
                        </button>
                      )}
                      {page.status !== 'archived' && (
                        <button
                          type="button"
                          onClick={() => handleStatusChange(page, 'archived')}
                          className="px-2 py-1 text-xs font-medium text-gray-600 dark:text-gray-400 hover:underline"
                        >
                          Archive
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => setPageToDelete(page)}
                        className="px-2 py-1 text-xs font-medium text-red-600 dark:text-red-400 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmModal
        isOpen={pageToDelete !== null}
        onClose={() => setPageToDelete(null)}
        onConfirm={confirmDelete}
        title="Delete Page"
        message={`Are you sure you want to delete "${pageToDelete?.title ?? 'this page'}"? This action cannot be undone.`}
        confirmText="Delete"
        variant="danger"
      />
    </div>
  );
}
