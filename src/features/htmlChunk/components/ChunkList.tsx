import { useState } from 'react';
import { useFormikContext } from 'formik';
import { ChunkEditor } from './ChunkEditor';
import { generateId } from '@/utils/helpers';
import type { Chunk, PageFormData } from '../types';

export function ChunkList() {
  const { values, setFieldValue } = useFormikContext<PageFormData>();
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  const addChunk = () => {
    const newChunk: Chunk = { id: generateId('chk_'), name: '', content: '' };
    setFieldValue('chunks', [...values.chunks, newChunk]);
  };

  const updateChunk = (index: number, patch: Partial<Chunk>) => {
    const next = values.chunks.map((chunk, i) => (i === index ? { ...chunk, ...patch } : chunk));
    setFieldValue('chunks', next);
  };

  const removeChunk = (index: number) => {
    setFieldValue(
      'chunks',
      values.chunks.filter((_, i) => i !== index)
    );
  };

  const reorderChunks = (from: number, to: number) => {
    if (from === to) return;
    const next = [...values.chunks];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    setFieldValue('chunks', next);
  };

  return (
    <div className="space-y-4">
      {values.chunks.length === 0 && (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          No chunks yet. Add your first HTML chunk to build this page.
        </p>
      )}

      {values.chunks.map((chunk, index) => (
        <ChunkEditor
          key={chunk.id}
          index={index}
          chunk={chunk}
          onNameChange={(value) => updateChunk(index, { name: value })}
          onContentChange={(value) => updateChunk(index, { content: value })}
          onRemove={() => removeChunk(index)}
          dragHandleProps={{
            draggable: true,
            onDragStart: () => setDragIndex(index),
            onDragOver: (e) => {
              e.preventDefault();
              e.dataTransfer.dropEffect = 'move';
            },
            onDrop: (e) => {
              e.preventDefault();
              if (dragIndex !== null) reorderChunks(dragIndex, index);
              setDragIndex(null);
            },
            onDragEnd: () => setDragIndex(null),
          }}
        />
      ))}

      <button
        type="button"
        onClick={addChunk}
        className="w-full py-3 text-sm font-medium text-blue-600 dark:text-blue-400 border-2 border-dashed border-blue-300 dark:border-blue-700 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
      >
        + Add HTML Chunk
      </button>
    </div>
  );
}
