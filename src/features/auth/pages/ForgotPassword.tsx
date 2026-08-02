import { ForgotPasswordForm } from '../components/ForgotPasswordForm';

export function ForgotPassword() {
  return (
    <div className="w-full max-w-md">
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xl p-8">
        <ForgotPasswordForm />
      </div>
    </div>
  );
}