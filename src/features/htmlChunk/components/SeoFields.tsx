import Switch from '@mui/material/Switch';
import { useFormikContext } from 'formik';
import { ImageUpload } from '@/components/ImageUpload';
import type { PageFormData, PageSeo } from '../types';
import { VALIDATION } from '@/utils/constants';

interface SeoFieldConfig {
  label: string;
  field: keyof PageSeo;
  type: 'text' | 'textarea' | 'url';
  placeholder?: string;
  maxLength?: number;
  helpText?: string;
  upload?: boolean;
}

const META_FIELDS: SeoFieldConfig[] = [
  {
    label: 'Meta Title',
    field: 'metaTitle',
    type: 'text',
    placeholder: 'Enter meta title (50-60 characters recommended)',
    maxLength: VALIDATION.META_TITLE_MAX,
  },
  {
    label: 'Meta Description',
    field: 'metaDescription',
    type: 'textarea',
    placeholder: 'Enter meta description (150-160 characters recommended)',
    maxLength: VALIDATION.META_DESCRIPTION_MAX,
  },
  {
    label: 'Meta Keywords',
    field: 'metaKeywords',
    type: 'text',
    placeholder: 'keyword1, keyword2, keyword3',
  },
];

const OG_FIELDS: SeoFieldConfig[] = [
  {
    label: 'Open Graph Title',
    field: 'openGraphTitle',
    type: 'text',
    placeholder: 'Enter Open Graph title (60 characters recommended)',
    maxLength: VALIDATION.OG_TITLE_MAX,
  },
  {
    label: 'Open Graph Description',
    field: 'openGraphDescription',
    type: 'textarea',
    placeholder: 'Enter Open Graph description (160 characters recommended)',
    maxLength: VALIDATION.OG_DESCRIPTION_MAX,
  },
  {
    label: 'Open Graph Image',
    field: 'openGraphImage',
    type: 'url',
    placeholder: 'https://hexpertify.com/og/example.jpg',
    upload: true,
  },
];

export function SeoFields() {
  const { values, errors, touched, setFieldValue, handleChange, handleBlur } = useFormikContext<PageFormData>();

  const setSeoField = (field: keyof PageSeo, value: string | boolean) => {
    setFieldValue(`seo.${field}`, value);
  };

  const renderField = (field: SeoFieldConfig) => {
    const fieldPath = `seo.${field.field}` as const;
    const error = touched.seo && touched.seo[field.field] ? errors.seo?.[field.field] : undefined;
    const isTextarea = field.type === 'textarea';
    return (
      <div key={field.field} className={`space-y-1.5 ${isTextarea || field.upload ? 'md:col-span-2' : ''}`}>
        <label htmlFor={field.field} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {field.label}
        </label>
        {field.upload ? (
          <ImageUpload
            value={values.seo[field.field] as string}
            onChange={(value) => setSeoField(field.field, value)}
            placeholder={field.placeholder}
          />
        ) : isTextarea ? (
          <textarea
            id={field.field}
            name={fieldPath}
            value={values.seo[field.field] as string}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={field.placeholder}
            maxLength={field.maxLength}
            className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors min-h-[100px] resize-y ${
              error ? 'border-red-500' : 'border-gray-400 dark:border-gray-500'
            }`}
            rows={4}
          />
        ) : (
          <input
            id={field.field}
            name={fieldPath}
            type={field.type}
            value={values.seo[field.field] as string}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={field.placeholder}
            maxLength={field.maxLength}
            className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
              error ? 'border-red-500' : 'border-gray-400 dark:border-gray-500'
            }`}
          />
        )}
        {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
        {!error && field.helpText && <p className="text-xs text-gray-500 dark:text-gray-400">{field.helpText}</p>}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-300 dark:border-gray-600 p-6 space-y-5">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Search Engine (Meta Tags)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">{META_FIELDS.map(renderField)}</div>

        <div className="border-t border-gray-300 dark:border-gray-600 pt-5 space-y-5">
          <h4 className="text-base font-medium text-gray-900 dark:text-white">Robots Indexing</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Index / NoIndex</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Allow search engines to index this page</p>
              </div>
              <Switch
                checked={values.seo.robotsIndex}
                onChange={(e) => setSeoField('robotsIndex', e.target.checked)}
                color="primary"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Follow / NoFollow</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Allow search engines to follow links on this page</p>
              </div>
              <Switch
                checked={values.seo.robotsFollow}
                onChange={(e) => setSeoField('robotsFollow', e.target.checked)}
                color="primary"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-300 dark:border-gray-600 p-6 space-y-5">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Social Media (Open Graph)</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Control how this page appears when shared on Facebook, LinkedIn, X, and other social platforms.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">{OG_FIELDS.map(renderField)}</div>
      </div>
    </div>
  );
}
