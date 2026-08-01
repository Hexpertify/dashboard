import type { ReactNode } from 'react';
import { DataTable } from '@/components/DataTable';
import { formatRelativeTime } from '@/utils/date';
import type { UserRecord, UserStatus } from '../types';

interface UserTableProps {
  data: UserRecord[];
  loading?: boolean;
  onEdit?: (user: UserRecord) => void;
  onDelete?: (user: UserRecord) => void;
}

const statusStyles: Record<UserStatus, string> = {
  active: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
  inactive: 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400',
  suspended: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
};

export function UserTable({ data, loading, onEdit, onDelete }: UserTableProps) {
  const columns = [
    {
      key: 'name',
      header: 'User',
      sortable: true,
      render: (user: UserRecord): ReactNode => (
        <div className="flex items-center gap-3">
          {user.avatar ? (
            <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full object-cover" />
          ) : (
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-sm font-bold text-white">{user.name.charAt(0).toUpperCase()}</span>
            </div>
          )}
          <div>
            <p className="font-medium text-gray-900 dark:text-white">{user.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'role',
      header: 'Role',
      sortable: true,
      render: (user: UserRecord): ReactNode => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400">
          {user.role}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (user: UserRecord): ReactNode => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[user.status]}`}>
          {user.status}
        </span>
      ),
    },
    {
      key: 'department',
      header: 'Department',
      render: (user: UserRecord): ReactNode => (
        <span className="text-gray-600 dark:text-gray-300">{user.department || '—'}</span>
      ),
    },
    {
      key: 'lastLogin',
      header: 'Last Login',
      render: (user: UserRecord): ReactNode => (
        <span className="text-gray-600 dark:text-gray-300">
          {user.lastLogin ? formatRelativeTime(user.lastLogin) : 'Never'}
        </span>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (user: UserRecord): ReactNode => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit?.(user)}
            className="px-3 py-1.5 text-xs font-medium text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete?.(user)}
            className="px-3 py-1.5 text-xs font-medium text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <DataTable<UserRecord>
      data={data}
      columns={columns}
      keyExtractor={(user) => user.id}
      loading={loading}
      emptyMessage="No users found"
      pageSize={10}
    />
  );
}