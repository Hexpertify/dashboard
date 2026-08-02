import { useAppSelector } from '@/app/hooks';
import type { SeoSettings } from '../types';

interface OpenGraphPreviewProps {
  className?: string;
}

export function OpenGraphPreview({ className = '' }: OpenGraphPreviewProps) {
  const seo = useAppSelector((state) => state.settings.seo) as SeoSettings;

  const displayTitle = seo.openGraphTitle || seo.metaTitle || 'Your Page Title';
  const displayDescription = seo.openGraphDescription || seo.metaDescription || 'Your page description will appear here when shared on social media.';

  return (
    <div className={`${className}`}>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Open Graph Preview</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          This is how your page will appear when shared on Facebook, LinkedIn, Twitter, and other social platforms.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm max-w-md">
        <div className="p-3 pb-0">
          <div className="aspect-[1.91/1] bg-gray-100 dark:bg-gray-700 relative overflow-hidden rounded-lg">
            {seo.openGraphImage ? (
              <img
                src={seo.openGraphImage}
                alt="Open Graph preview image"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/1200x630/3B82F6/FFFFFF?text=Image+Not+Found';
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-700">
                <svg
                  className="w-16 h-16 text-white/50"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            )}
          </div>
        </div>

        <div className="p-4 space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
              <svg
                className="w-5 h-5 text-blue-600 dark:text-blue-400"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{displayTitle}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 mt-1">{displayDescription}</p>
            </div>
          </div>

          <div className="pt-2 border-t border-gray-100 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400 font-mono truncate">
              https://hexpertify.com/your-page
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg">
          <p className="font-medium text-gray-700 dark:text-gray-300 mb-1">Meta Title Length</p>
          <p className="text-gray-600 dark:text-gray-400 font-mono">{seo.metaTitle.length} / 60 chars</p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg">
          <p className="font-medium text-gray-700 dark:text-gray-300 mb-1">Meta Description Length</p>
          <p className="text-gray-600 dark:text-gray-400 font-mono">{seo.metaDescription.length} / 160 chars</p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg">
          <p className="font-medium text-gray-700 dark:text-gray-300 mb-1">OG Title Length</p>
          <p className="text-gray-600 dark:text-gray-400 font-mono">{seo.openGraphTitle.length} / 90 chars</p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg">
          <p className="font-medium text-gray-700 dark:text-gray-300 mb-1">OG Description Length</p>
          <p className="text-gray-600 dark:text-gray-400 font-mono">{seo.openGraphDescription.length} / 200 chars</p>
        </div>
      </div>

      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <h4 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-1">Robots Meta Tag Preview</h4>
        <code className="text-xs text-blue-700 dark:text-blue-400 font-mono block">
          {'<meta name="robots" content="' + (seo.robotsIndex ? 'index' : 'noindex') + ',' + (seo.robotsFollow ? 'follow' : 'nofollow') + '" />'}
        </code>
      </div>
    </div>
  );
}