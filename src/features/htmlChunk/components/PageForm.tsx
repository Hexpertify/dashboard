import { useMemo, useRef, type ReactNode } from 'react';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { SeoFields } from './SeoFields';
import { ChunkList } from './ChunkList';
import { LivePreview } from './LivePreview';
import { REGEX } from '@/utils/constants';
import { slugify } from '@/utils/helpers';
import type { PageFormData, PageRecord, PageStatus } from '../types';
import { initialPageFormData } from '../types';

export type SubmitAction = 'draft' | 'publish';

interface PageFormProps {
  initialValues?: Partial<PageFormData>;
  existingPages: PageRecord[];
  currentId?: string;
  submitLabel?: string;
  aside?: ReactNode;
  onSubmit: (data: PageFormData, action: SubmitAction, summary?: string) => void;
}

export function PageForm({ initialValues, existingPages, currentId, submitLabel, aside, onSubmit }: PageFormProps) {
  const actionRef = useRef<SubmitAction>('draft');
  const summaryRef = useRef('');
  const autoFillUrlRef = useRef(true);

  const validationSchema = useMemo(
    () =>
      yup.object({
        title: yup.string().required('Page title is required'),
        identifierUrl: yup
          .string()
          .required('Identifier URL is required')
          .matches(REGEX.SLUG, 'Identifier URL can only contain lowercase letters, numbers, and hyphens (-)')
          .test('unique', 'This Identifier URL is already in use', (value) => {
            if (!value) return true;
            return !existingPages.some((page) => page.identifierUrl === value && page.id !== currentId);
          }),
        status: yup.mixed<PageStatus>().oneOf(['draft', 'published', 'archived']),
        seo: yup.object({
          openGraphImage: yup
            .string()
            .test(
              'http',
              'Open Graph image must be an uploaded image or a valid URL starting with http:// or https://',
              (value) => !value || value.startsWith('data:image/') || /^https?:\/\/.+/.test(value)
            ),
        }),
        chunks: yup.array().of(
          yup.object({
            id: yup.string(),
            name: yup.string().required('Chunk name is required'),
            content: yup.string(),
          })
        ),
      }),
    [existingPages, currentId]
  );

  return (
    <Formik
      initialValues={{ ...initialPageFormData, ...initialValues }}
      validationSchema={validationSchema}
      onSubmit={(values) => onSubmit(values, actionRef.current, summaryRef.current.trim() || undefined)}
    >
      {({ values, handleChange, handleBlur, errors, touched, setFieldValue, submitForm, isSubmitting }) => {
        const handleSubmit = (action: SubmitAction) => {
          actionRef.current = action;
          submitForm();
        };

        const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          handleChange(e);
          if (autoFillUrlRef.current) {
            setFieldValue('identifierUrl', slugify(e.target.value));
          }
        };

        const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          autoFillUrlRef.current = false;
          handleChange(e);
        };

        return (
          <Form className="space-y-8" noValidate>
            <div className="grid grid-cols-1 xl:grid-cols-5 gap-6 items-start">
              <div className="xl:col-span-3 space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-300 dark:border-gray-600 p-6 space-y-5">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Page Details</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Page Title
                      </label>
                      <input
                        id="title"
                        name="title"
                        type="text"
                        value={values.title}
                        onChange={handleTitleChange}
                        onBlur={handleBlur}
                        placeholder="e.g. Career Guidance"
                        className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                          touched.title && errors.title ? 'border-red-500' : 'border-gray-400 dark:border-gray-500'
                        }`}
                      />
                      {touched.title && errors.title && <p className="text-sm text-red-600 dark:text-red-400">{errors.title}</p>}
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="identifierUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Identifier URL
                      </label>
                      <div className="flex items-center gap-2">
                        <span className="flex-shrink-0 text-sm text-gray-500 dark:text-gray-400">https://hexpertify.com/</span>
                        <input
                          id="identifierUrl"
                          name="identifierUrl"
                          type="text"
                          value={values.identifierUrl}
                          onChange={handleUrlChange}
                          onBlur={handleBlur}
                          placeholder="career-guidance"
                          className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                            touched.identifierUrl && errors.identifierUrl ? 'border-red-500' : 'border-gray-400 dark:border-gray-500'
                          }`}
                        />
                      </div>
                      {touched.identifierUrl && errors.identifierUrl ? (
                        <p className="text-sm text-red-600 dark:text-red-400">{errors.identifierUrl}</p>
                      ) : (
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Auto-filled from the title — edit it manually to customize. Lowercase letters, numbers, and hyphens only.
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <SeoFields />

                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-300 dark:border-gray-600 p-6 space-y-5">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">HTML Chunks</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Build the page content with reusable HTML chunks. Drag to reorder.
                    </p>
                  </div>
                  <ChunkList />
                </div>

                {currentId && (
                  <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-300 dark:border-gray-600 p-6 space-y-1.5">
                    <label htmlFor="changeSummary" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Summary of Changes
                    </label>
                    <input
                      id="changeSummary"
                      type="text"
                      onChange={(e) => {
                        summaryRef.current = e.target.value;
                      }}
                      placeholder="e.g. Updated hero section copy"
                      className="w-full px-3 py-2 border border-gray-400 dark:border-gray-500 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400">Recorded in the version history when you save.</p>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setFieldValue('status', 'draft');
                      handleSubmit('draft');
                    }}
                    disabled={isSubmitting}
                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-500 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Save as Draft
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setFieldValue('status', 'published');
                      handleSubmit('publish');
                    }}
                    disabled={isSubmitting}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Saving...' : submitLabel ?? 'Publish'}
                  </button>
                </div>
              </div>

              <div className="xl:col-span-2">
                <div className="sticky top-24 space-y-6">
                  <LivePreview />
                  {aside}
                </div>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
