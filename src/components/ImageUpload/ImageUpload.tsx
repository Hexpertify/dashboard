import { useRef, useState, type ChangeEvent, type DragEvent } from 'react';

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

type Mode = 'upload' | 'url';

const MAX_FILE_SIZE_MB = 5;

function isImageFile(file: File): boolean {
  return file.type.startsWith('image/');
}

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

function initialMode(value: string): Mode {
  return value.startsWith('http://') || value.startsWith('https://') ? 'url' : 'upload';
}

export function ImageUpload({ value, onChange, placeholder = 'https://example.com/image.jpg' }: ImageUploadProps) {
  const [mode, setMode] = useState<Mode>(() => initialMode(value));
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    if (!isImageFile(file)) {
      setError('Please select an image file (JPG, PNG, GIF, SVG, WebP).');
      return;
    }
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setError(`Image is too large. Maximum size is ${MAX_FILE_SIZE_MB}MB.`);
      return;
    }
    setError(undefined);
    try {
      const dataUrl = await readFileAsDataUrl(file);
      onChange(dataUrl);
    } catch {
      setError('Failed to read the image file.');
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFile(e.dataTransfer.files?.[0]);
  };

  const handleBrowse = (e: ChangeEvent<HTMLInputElement>) => {
    handleFile(e.target.files?.[0]);
    e.target.value = '';
  };

  const tabClass = (active: boolean) =>
    `px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
      active
        ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm border border-gray-200 dark:border-gray-600'
        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
    }`;

  return (
    <div className="space-y-2">
      <div className="inline-flex items-center rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900/50 p-1 gap-1">
        <button type="button" onClick={() => setMode('upload')} className={tabClass(mode === 'upload')}>
          Upload Image
        </button>
        <button type="button" onClick={() => setMode('url')} className={tabClass(mode === 'url')}>
          Image URL
        </button>
      </div>

      {mode === 'upload' ? (
        <>
          <div
            role="button"
            tabIndex={0}
            onClick={() => inputRef.current?.click()}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click();
            }}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`relative border-2 border-dashed rounded-lg transition-colors cursor-pointer overflow-hidden ${
              isDragging
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 bg-gray-50 dark:bg-gray-900/50'
            }`}
          >
            {value ? (
              <>
                <img src={value} alt="Open Graph preview" className="w-full h-32 object-cover" />
                <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-sm font-medium text-white">Click or drop to replace</span>
                </div>
              </>
            ) : (
              <div className="h-32 flex flex-col items-center justify-center gap-2 text-gray-500 dark:text-gray-400">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-sm">Drag & drop an image here, or <span className="text-blue-600 dark:text-blue-400 font-medium">browse</span></p>
                <p className="text-xs">JPG, PNG, GIF, SVG, WebP — max {MAX_FILE_SIZE_MB}MB</p>
              </div>
            )}
          </div>

          <input ref={inputRef} type="file" accept="image/*" onChange={handleBrowse} className="hidden" />

          {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}

          {value && (
            <button
              type="button"
              onClick={() => onChange('')}
              className="text-xs font-medium text-red-600 dark:text-red-400 hover:underline"
            >
              Remove image
            </button>
          )}
        </>
      ) : (
        <>
          <input
            type="url"
            value={value.startsWith('data:') ? '' : value}
            onChange={(e) => {
              setError(undefined);
              onChange(e.target.value);
            }}
            placeholder={placeholder}
            className="w-full px-3 py-2 border border-gray-400 dark:border-gray-500 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          />
          {value && (
            <button
              type="button"
              onClick={() => onChange('')}
              className="text-xs font-medium text-red-600 dark:text-red-400 hover:underline"
            >
              Remove image
            </button>
          )}
        </>
      )}
    </div>
  );
}
