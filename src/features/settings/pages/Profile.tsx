import { ProfileCard } from '../components/ProfileCard';
import { ThemeSwitcher } from '../components/ThemeSwitcher';

export function Profile() {
  return (
    <div className="p-6 space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Profile</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your profile information and preferences.</p>
      </div>

      <ProfileCard
        name="John Doe"
        email="john.doe@example.com"
        role="Administrator"
        onEdit={() => console.log('Edit profile clicked')}
      />

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Appearance</h2>
        <ThemeSwitcher />
      </div>
    </div>
  );
}