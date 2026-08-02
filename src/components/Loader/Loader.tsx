import Skeleton from '@mui/material/Skeleton';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Loader({ size = 'md', className = '' }: LoaderProps) {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-4',
    lg: 'h-12 w-12 border-4',
  };

  return (
    <div className={`inline-block animate-spin ${sizeClasses[size]} border-blue-600 border-t-transparent rounded-full ${className}`} role="status" aria-label="Loading">
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center gap-6 w-full max-w-xs px-4">
        <Skeleton variant="circular" width={64} height={64} />
        <div className="w-full space-y-3">
          <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
          <Skeleton variant="text" sx={{ fontSize: '1rem' }} width="80%" />
        </div>
        <Skeleton variant="rounded" width="100%" height={40} />
      </div>
      <p className="sr-only">Loading...</p>
    </div>
  );
}

export function InlineLoader(text = 'Loading...') {
  return (
    <div className="flex items-center justify-center gap-2 py-4">
      <Loader size="sm" />
      <span className="text-sm text-gray-500 dark:text-gray-400">{text}</span>
    </div>
  );
}
