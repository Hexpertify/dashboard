import { Link, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { updatePage } from '../slice';
import { PageForm, type SubmitAction } from '../components/PageForm';
import { VersionHistory } from '../components/VersionHistory';
import type { PageFormData } from '../types';

export function EditPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const pages = useAppSelector((state) => state.htmlChunk.pages);
  const page = pages.find((p) => p.id === id);
  const actor = useAppSelector((state) => state.auth.user?.name ?? 'Administrator');

  if (!page) {
    return (
      <div className="p-6 space-y-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Page not found</h1>
        <p className="text-gray-500 dark:text-gray-400">The page you're trying to edit doesn't exist.</p>
        <Link to="/dashboard/html-chunk" className="text-blue-600 dark:text-blue-400 hover:underline">
          Back to HTML Chunk Pages
        </Link>
      </div>
    );
  }

  const handleSubmit = (data: PageFormData, action: SubmitAction, summary?: string) => {
    dispatch(updatePage({ id: page.id, data, actor, summary }));
    toast.success(action === 'publish' ? `Page "${data.title}" published` : `Page "${data.title}" saved as draft`);
    navigate('/dashboard/html-chunk');
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <nav className="text-sm text-gray-500 dark:text-gray-400 mb-2" aria-label="Breadcrumb">
          <Link to="/dashboard/html-chunk" className="hover:text-blue-600 dark:hover:text-blue-400">
            HTML Chunk Pages
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700 dark:text-gray-300">Edit — {page.title}</span>
        </nav>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Page</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Update page details, SEO settings, and chunks. Every save is recorded in the version history.
        </p>
      </div>

      <PageForm
        existingPages={pages}
        currentId={page.id}
        initialValues={{
          title: page.title,
          identifierUrl: page.identifierUrl,
          status: page.status,
          seo: page.seo,
          chunks: page.chunks,
        }}
        submitLabel="Save & Publish"
        onSubmit={handleSubmit}
        aside={<VersionHistory pageId={page.id} versions={page.versions} />}
      />
    </div>
  );
}
