import { useState } from 'react';
import type { PreviewData } from '../types';

type Device = 'desktop' | 'tablet' | 'mobile';

interface PreviewFrameProps {
  data: PreviewData;
}

const deviceWidths: Record<Device, string> = {
  desktop: '100%',
  tablet: '768px',
  mobile: '375px',
};

const deviceLabels: Record<Device, string> = {
  desktop: 'Desktop',
  tablet: 'Tablet',
  mobile: 'Mobile',
};

export function PreviewFrame({ data }: PreviewFrameProps) {
  const [device, setDevice] = useState<Device>('desktop');

  const robotsMeta = [
    data.seo.robotsIndex ? 'index' : 'noindex',
    data.seo.robotsFollow ? 'follow' : 'nofollow',
  ].join(', ');

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Preview</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            https://hexpertify.com/{data.identifierUrl || '(identifier-url)'}
          </p>
        </div>
        <div className="inline-flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1" role="group" aria-label="Preview device">
          {(Object.keys(deviceWidths) as Device[]).map((deviceOption) => (
            <button
              key={deviceOption}
              type="button"
              onClick={() => setDevice(deviceOption)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                device === deviceOption
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
              aria-pressed={device === deviceOption}
            >
              {deviceLabels[deviceOption]}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-center">
        <div
          className="w-full bg-gray-50 dark:bg-gray-950 border border-gray-300 dark:border-gray-600 rounded-xl overflow-hidden transition-all duration-300"
          style={{ maxWidth: deviceWidths[device] }}
        >
          <div className="bg-white dark:bg-gray-900 border-b border-gray-300 dark:border-gray-600 px-4 sm:px-6 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">Hexpertify</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                <span className="hidden sm:inline">Home</span>
                <span className="hidden sm:inline">Services</span>
                <span className="hidden sm:inline">About</span>
                <span>Contact</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 px-4 sm:px-6 py-6 space-y-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                {data.title || 'Untitled Page'}
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                /{data.identifierUrl || '(identifier-url)'} · {robotsMeta}
              </p>
            </div>
            {data.chunks.length === 0 ? (
              <p className="text-sm text-gray-500 dark:text-gray-400">This page has no chunks yet.</p>
            ) : (
              data.chunks.map((chunk) => (
                <div key={chunk.id} className="prose-sm max-w-none text-gray-700 dark:text-gray-300">
                  <div dangerouslySetInnerHTML={{ __html: chunk.content || '<p class="text-gray-400 dark:text-gray-500">Empty chunk</p>' }} />
                </div>
              ))
            )}
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 border-t border-gray-300 dark:border-gray-600 px-4 sm:px-6 py-4">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} Hexpertify — Global Footer
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
