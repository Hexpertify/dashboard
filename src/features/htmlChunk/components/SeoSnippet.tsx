interface SeoSnippetProps {
  title: string;
  url: string;
  description: string;
  robots: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogAltText?: string;
}

export function SeoSnippet({ title, url, description, robots, ogTitle, ogDescription, ogImage, ogAltText }: SeoSnippetProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-300 dark:border-gray-600 p-5 space-y-5">
      <div>
        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">Search Result Preview</p>
        <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
          <p className="text-[13px] text-gray-600 dark:text-gray-400 truncate">{url || 'https://hexpertify.com/'}</p>
          <p className="text-lg text-blue-700 dark:text-blue-400 hover:underline cursor-pointer leading-snug">
            {title || 'Page Title'}
          </p>
          <p className="text-[13px] text-gray-600 dark:text-gray-400 leading-snug line-clamp-2">
            {description || 'Meta description will appear here — keep it 150-160 characters.'}
          </p>
        </div>
      </div>

      <div>
        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">Social Share Preview</p>
        <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
          <div className="h-28 bg-gradient-to-br from-blue-400/60 to-purple-600/60 rounded-t-lg flex items-center justify-center overflow-hidden">
            {ogImage ? (
              <img src={ogImage} alt={ogAltText || 'Open Graph image'} className="w-full h-full object-cover" />
            ) : (
              <span className="text-xs text-white/80">1200x630 recommended</span>
            )}
          </div>
          <div className="p-2.5 border border-t-0 border-gray-300 dark:border-gray-600 rounded-b-lg bg-white dark:bg-gray-900">
            <p className="text-[11px] text-gray-500 dark:text-gray-400 uppercase truncate">
              {url || 'hexpertify.com'}
            </p>
            <p className="text-sm font-semibold text-gray-900 dark:text-white leading-snug line-clamp-1">
              {ogTitle || title || 'Open Graph Title'}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-snug line-clamp-2">
              {ogDescription || 'Open Graph description will appear here.'}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
        <span className="font-medium">Robots:</span>
        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 font-mono">
          {robots}
        </span>
      </div>
    </div>
  );
}
