import { useState } from 'react';
import { useAppDispatch } from '@/app/hooks';
import { restoreVersion } from '../slice';
import { formatDateTime } from '@/utils/date';
import type { VersionRecord } from '../types';

interface VersionHistoryProps {
  pageId: string;
  versions: VersionRecord[];
}

export function VersionHistory({ pageId, versions }: VersionHistoryProps) {
  const dispatch = useAppDispatch();
  const [versionToRestore, setVersionToRestore] = useState<VersionRecord | null>(null);

  const confirmRestore = () => {
    if (versionToRestore) {
      dispatch(restoreVersion({ id: pageId, version: versionToRestore.version, actor: 'John Doe' }));
      setVersionToRestore(null);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-300 dark:border-gray-600 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Version History</h3>
      <div className="space-y-3">
        {versions.map((version) => (
          <div key={version.version} className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-300 dark:border-gray-600">
            <div className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center px-2 py-0.5 text-xs font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                v{version.version}
              </span>
              <button
                type="button"
                onClick={() => setVersionToRestore(version)}
                className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
              >
                Restore
              </button>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">{version.summary}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {version.updatedBy} · {formatDateTime(version.updatedAt)}
            </p>
          </div>
        ))}
      </div>

      {versionToRestore && (
        <div className="fixed inset-0 z-[400] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setVersionToRestore(null)} aria-hidden="true" />
          <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 w-full max-w-md">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Restore version v{versionToRestore.version}?</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              This will replace the current page content with "{versionToRestore.summary}". A new version will be recorded.
            </p>
            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={() => setVersionToRestore(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmRestore}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Restore
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
