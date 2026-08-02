import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { deleteUser } from '../slice';
import { ConfirmModal } from '@/components/Modal';
import { PrimaryButton } from '@/components/Button';
import { useState } from 'react';
import { formatRelativeTime } from '@/utils/date';
import type { UserStatus } from '../types';

const statusStyles: Record<UserStatus, string> = {
  active: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
  inactive: 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400',
  suspended: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
};

export function UserDetails() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const user = useAppSelector((state) => state.users.list.find((u) => u.id === id));
  const [showDelete, setShowDelete] = useState(false);

  if (!user) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">User not found</h1>
        <p className="text-gray-500 dark:text-gray-400">The user you're looking for doesn't exist.</p>
        <Link to="/dashboard/users" className="text-blue-600 dark:text-blue-400 hover:underline">
          Back to users
        </Link>
      </div>
    );
  }

  const handleDelete = () => {
    dispatch(deleteUser(user.id));
    setShowDelete(false);
    navigate('/dashboard/users');
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <nav className="text-sm text-gray-500 dark:text-gray-400 mb-2" aria-label="Breadcrumb">
          <Link to="/dashboard/users" className="hover:text-blue-600 dark:hover:text-blue-400">
            Users
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700 dark:text-gray-300">{user.name}</span>
        </nav>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-full object-cover" />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">{user.name.charAt(0).toUpperCase()}</span>
              </div>
            )}
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{user.name}</h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400">
                  {user.role}
                </span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusStyles[user.status]}`}>
                  {user.status}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <PrimaryButton asChild>
              <Link to={`/dashboard/users/${user.id}/edit`}>Edit</Link>
            </PrimaryButton>
            <PrimaryButton variant="danger" onClick={() => setShowDelete(true)}>
              Delete
            </PrimaryButton>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Profile Information</h2>
        </div>
        <dl className="divide-y divide-gray-200 dark:divide-gray-700">
          {[
            { label: 'Full Name', value: user.name },
            { label: 'Email', value: user.email },
            { label: 'Phone', value: user.phone || '—' },
            { label: 'Department', value: user.department || '—' },
            { label: 'Role', value: user.role },
            { label: 'Status', value: user.status },
            { label: 'Member Since', value: formatRelativeTime(user.createdAt) },
            { label: 'Last Login', value: user.lastLogin ? formatRelativeTime(user.lastLogin) : 'Never' },
            { label: 'User ID', value: user.id },
          ].map((row) => (
            <div key={row.label} className="px-6 py-4 grid grid-cols-1 sm:grid-cols-3 gap-2">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">{row.label}</dt>
              <dd className="text-sm text-gray-900 dark:text-white sm:col-span-2 break-all">{row.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <ConfirmModal
        isOpen={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={handleDelete}
        title="Delete User"
        message={`Are you sure you want to delete ${user.name}? This action cannot be undone.`}
        confirmText="Delete"
        variant="danger"
      />
    </div>
  );
}