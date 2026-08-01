import { Link } from 'react-router-dom';
import { PrimaryButton } from '@/components/Button';

export function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <span className="text-9xl font-bold text-gray-200 dark:text-gray-800">404</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Page Not Found</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <PrimaryButton asChild>
            <Link to="/dashboard">Go to Dashboard</Link>
          </PrimaryButton>
          <PrimaryButton variant="outline" asChild>
            <Link to="/">Back to Home</Link>
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}