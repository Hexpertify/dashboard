import type { UserRecord, UserStatus } from '../types';
import { formatRelativeTime } from '@/utils/date';

interface UserCardProps {
  user: UserRecord;
  onEdit?: (user: UserRecord) => void;
  onDelete?: (user: UserRecord) => void;
}

const statusStyles: Record<UserStatus, string> = {
  active: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
  inactive: 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400',
  suspended: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
};

const roleStyles: Record<UserRecord['role'], string> = {
  admin: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400',
  manager: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
  editor: 'bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400',
  viewer: 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400',
};

export function UserCard({ user, onEdit, onDelete }: UserCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <div className="relative flex-shrink-0">
          {user.avatar ? (
            <img src={user.avatar} alt={user.name} className="w-14 h-14 rounded-full object-cover" />
          ) : (
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-lg font-bold text-white">{user.name.charAt(0).toUpperCase()}</span>
            </div>
          )}
          <span
            className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white dark:border-gray-800 ${
              user.status === 'active' ? 'bg-green-500' : user.status === 'suspended' ? 'bg-red-500' : 'bg-gray-400'
            }`}
            aria-hidden="true"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 dark:text-white truncate">{user.name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${roleStyles[user.role]}`}>
              {user.role}
            </span>
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusStyles[user.status]}`}>
              {user.status}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 space-y-1">
        {user.department && (
          <p className="text-xs text-gray-500 dark:text-gray-400">Department: {user.department}</p>
        )}
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Last login: {user.lastLogin ? formatRelativeTime(user.lastLogin) : 'Never'}
        </p>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <button
          onClick={() => onEdit?.(user)}
          className="flex-1 px-3 py-1.5 text-xs font-medium text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete?.(user)}
          className="flex-1 px-3 py-1.5 text-xs font-medium text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
}