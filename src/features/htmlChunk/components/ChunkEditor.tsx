import { useState } from 'react';
import type { Chunk } from '../types';

interface ChunkEditorProps {
  index: number;
  chunk: Chunk;
  onNameChange: (value: string) => void;
  onContentChange: (value: string) => void;
  onRemove: () => void;
  dragHandleProps: {
    draggable: boolean;
    onDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
    onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
    onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
    onDragEnd: () => void;
  };
}

export function ChunkEditor({ index, chunk, onNameChange, onContentChange, onRemove, dragHandleProps }: ChunkEditorProps) {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div
      {...dragHandleProps}
      className="bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-500 rounded-xl p-4 space-y-3"
    >
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 flex-shrink-0"
          title="Drag to reorder"
          aria-label={`Drag chunk ${index + 1} to reorder`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9h8M8 15h8" />
          </svg>
        </button>
        <div className="flex-1 min-w-0">
          <label htmlFor={`chunk-name-${index}`} className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
            Chunk {index + 1} — Name
          </label>
          <input
            id={`chunk-name-${index}`}
            type="text"
            value={chunk.name}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder="e.g. Hero Section"
            className="w-full px-3 py-2 text-sm border border-gray-400 dark:border-gray-500 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          />
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            type="button"
            onClick={() => setShowPreview((prev) => !prev)}
            className="px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            {showPreview ? 'HTML' : 'Preview'}
          </button>
          <button
            type="button"
            onClick={onRemove}
            className="p-1.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            title="Remove chunk"
            aria-label={`Remove chunk ${index + 1}`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      <div>
        <label htmlFor={`chunk-content-${index}`} className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
          HTML Content
        </label>
        {showPreview ? (
          <div className="min-h-[120px] px-3 py-2 border border-gray-400 dark:border-gray-500 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white prose-sm max-w-none">
            <div dangerouslySetInnerHTML={{ __html: chunk.content || '<p class="text-gray-400 dark:text-gray-500">No content yet</p>' }} />
          </div>
        ) : (
          <textarea
            id={`chunk-content-${index}`}
            value={chunk.content}
            onChange={(e) => onContentChange(e.target.value)}
            placeholder={'<h2>Your heading</h2>\n<p>Your paragraph text...</p>'}
            spellCheck={false}
            className="w-full px-3 py-2 text-sm font-mono border border-gray-400 dark:border-gray-500 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors min-h-[120px] resize-y"
          />
        )}
      </div>
    </div>
  );
}
