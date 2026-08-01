import { SeoForm } from '../components/SeoForm';
import { OpenGraphPreview } from '../components/OpenGraphPreview';

export function SeoSettings() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">SEO Settings</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Configure search engine optimization and social sharing settings for your page.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SeoForm />
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <OpenGraphPreview />
          </div>
        </div>
      </div>
    </div>
  );
}