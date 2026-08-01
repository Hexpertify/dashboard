import { Link } from 'react-router-dom';
import { PrimaryButton } from '@/components/Button';

export function Unauthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
          <svg className="w-10 h-10 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Access Denied</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          You don't have permission to access this page. Please contact your administrator if you believe this is an error.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <PrimaryButton asChild>
            <Link to="/dashboard">Go to Dashboard</Link>
          </PrimaryButton>
          <PrimaryButton variant="outline" asChild>
            <Link to="/login">Sign In</Link>
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}