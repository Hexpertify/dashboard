import toast from 'react-hot-toast';
import Switch from '@mui/material/Switch';
import * as yup from 'yup';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { ImageUpload } from '@/components/ImageUpload';
import type { SeoSettings } from '../types';
import { updateSeoField, syncMetaToOpenGraph, markSeoClean } from '../slice';
import { CharacterCounter } from './CharacterCounter';

interface FieldConfig {
  label: string;
  name: keyof SeoSettings;
  type: 'text' | 'textarea' | 'url';
  placeholder?: string;
  maxLength?: number;
  recommendedLength?: number;
  helpText?: string;
}

const SEO_FIELDS: FieldConfig[] = [
  {
    label: 'Meta Title',
    name: 'metaTitle',
    type: 'text',
    placeholder: 'Enter meta title (50-60 characters recommended)',
    maxLength: 70,
    recommendedLength: 60,
  },
  {
    label: 'Meta Description',
    name: 'metaDescription',
    type: 'textarea',
    placeholder: 'Enter meta description (150-160 characters recommended)',
    maxLength: 180,
    recommendedLength: 160,
  },
  {
    label: 'Meta Keywords',
    name: 'metaKeywords',
    type: 'text',
    placeholder: 'keyword1, keyword2, keyword3',
  },
  {
    label: 'Open Graph Title',
    name: 'openGraphTitle',
    type: 'text',
    placeholder: 'Enter Open Graph title (60 characters recommended)',
    maxLength: 90,
    recommendedLength: 60,
  },
  {
    label: 'Open Graph Description',
    name: 'openGraphDescription',
    type: 'textarea',
    placeholder: 'Enter Open Graph description (160 characters recommended)',
    maxLength: 200,
    recommendedLength: 160,
  },
  {
    label: 'Open Graph Image URL',
    name: 'openGraphImage',
    type: 'url',
    placeholder: 'https://example.com/og-image.jpg',
  },
];

const META_FIELDS = SEO_FIELDS.filter((field) => field.name.startsWith('meta'));
const OG_FIELDS = SEO_FIELDS.filter((field) => field.name.startsWith('openGraph'));

const seoSaveSchema = yup.object({
  openGraphImage: yup
    .string()
    .test('http', 'Open Graph image must be an uploaded image or a valid URL starting with http:// or https://', (value) => !value || value.startsWith('data:image/') || /^https?:\/\/.+/.test(value)),
});

export function SeoForm() {
  const dispatch = useAppDispatch();
  const seo = useAppSelector((state) => state.settings.seo);
  const isDirty = useAppSelector((state) => state.settings.isDirty);

  const handleChange = (field: keyof SeoSettings, value: string | boolean) => {
    dispatch(updateSeoField(field, value));
  };

  const handleSyncMetaToOg = () => {
    dispatch(syncMetaToOpenGraph());
    dispatch(markSeoClean());
    toast.success('Meta fields synced to Open Graph');
  };

  const handleSave = async () => {
    try {
      await seoSaveSchema.validate(seo, { abortEarly: false });
      dispatch(markSeoClean());
      toast.success('SEO settings saved');
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        toast.error(err.errors[0]);
      }
    }
  };

  const renderField = (field: FieldConfig) => (
    <div key={field.name} className="space-y-1.5">
      <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {field.label}
      </label>
      {field.name === 'openGraphImage' ? (
        <ImageUpload
          value={seo.openGraphImage}
          onChange={(value) => handleChange('openGraphImage', value)}
          placeholder={field.placeholder}
        />
      ) : field.type === 'textarea' ? (
        <textarea
          id={field.name}
          name={field.name}
          value={seo[field.name] as string}
          onChange={(e) => handleChange(field.name, e.target.value)}
          placeholder={field.placeholder}
          maxLength={field.maxLength}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors min-h-[100px] resize-y"
          rows={4}
        />
      ) : (
        <input
          id={field.name}
          name={field.name}
          type={field.type}
          value={seo[field.name] as string}
          onChange={(e) => handleChange(field.name, e.target.value)}
          placeholder={field.placeholder}
          maxLength={field.maxLength}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
        />
      )}
      {(field.maxLength || field.recommendedLength) && (
        <CharacterCounter
          value={seo[field.name] as string}
          maxLength={field.maxLength}
          recommendedLength={field.recommendedLength}
        />
      )}
      {field.helpText && <p className="text-xs text-gray-500 dark:text-gray-400">{field.helpText}</p>}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">SEO Settings</h2>
        {isDirty && <span className="text-sm text-amber-600 dark:text-amber-400">Unsaved changes</span>}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 space-y-5">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Search Engine (Meta Tags)</h3>
        <div className="space-y-5">{META_FIELDS.map(renderField)}</div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-5 space-y-5">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Robots Indexing</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Index / NoIndex</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Allow search engines to index this page</p>
              </div>
              <Switch
                checked={seo.robotsIndex}
                onChange={(e) => handleChange('robotsIndex', e.target.checked)}
                color="primary"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Follow / NoFollow</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Allow search engines to follow links on this page</p>
              </div>
              <Switch
                checked={seo.robotsFollow}
                onChange={(e) => handleChange('robotsFollow', e.target.checked)}
                color="primary"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 space-y-5">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Social Media (Open Graph)</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Control how your site appears when shared on Facebook, LinkedIn, X, and other social platforms.
        </p>
        <div className="space-y-5">{OG_FIELDS.map(renderField)}</div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
        <button
          type="button"
          onClick={handleSyncMetaToOg}
          className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        >
          Sync Meta to OpenGraph
        </button>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleSave}
            disabled={!isDirty}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
