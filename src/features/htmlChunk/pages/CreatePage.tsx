import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { addPage } from '../slice';
import { PageForm, type SubmitAction } from '../components/PageForm';
import type { PageFormData } from '../types';

export function CreatePage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const pages = useAppSelector((state) => state.htmlChunk.pages);
  const actor = useAppSelector((state) => state.auth.user?.name ?? 'Administrator');

  const handleSubmit = (data: PageFormData, action: SubmitAction) => {
    dispatch(addPage({ data, actor }));
    toast.success(action === 'publish' ? `Page "${data.title}" published` : `Page "${data.title}" saved as draft`);
    navigate('/dashboard/html-chunk');
  };

  return (
    <div className="p-6 space-y-6">
      <div>
       
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create New Page</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Define the page details, configure SEO settings, and build the content with HTML chunks.
        </p>
      </div>

      <PageForm existingPages={pages} submitLabel="Publish" onSubmit={handleSubmit} />
    </div>
  );
}
