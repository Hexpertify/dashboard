import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { deleteUser } from '../slice';
import { UserTable } from '../components/UserTable';
import { UserCard } from '../components/UserCard';
import { ConfirmModal } from '@/components/Modal';
import { PrimaryButton } from '@/components/Button';
import type { UserRecord } from '../types';

type ViewMode = 'table' | 'grid';

export function UserList() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const users = useAppSelector((state) => state.users.list);
  const [viewMode, setViewMode] = useState<ViewMode>('table');
  const [search, setSearch] = useState('');
  const [userToDelete, setUserToDelete] = useState<UserRecord | null>(null);

  const filteredUsers = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return users;
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(term) ||
        u.email.toLowerCase().includes(term) ||
        u.role.toLowerCase().includes(term) ||
        (u.department || '').toLowerCase().includes(term)
    );
  }, [users, search]);

  const handleDelete = (user: UserRecord) => {
    setUserToDelete(user);
  };

  const confirmDelete = () => {
    if (userToDelete) {
      dispatch(deleteUser(userToDelete.id));
      toast.success(`User "${userToDelete.name}" deleted`);
      setUserToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Users</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Manage user accounts and permissions ({filteredUsers.length} users)
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1" role="group" aria-label="View mode">
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                viewMode === 'table'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
              aria-pressed={viewMode === 'table'}
            >
              Table
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
              aria-pressed={viewMode === 'grid'}
            >
              Grid
            </button>
          </div>
          <PrimaryButton asChild>
            <Link to="/dashboard/users/create">Add User</Link>
          </PrimaryButton>
        </div>
      </div>

      <div className="relative max-w-md">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search users..."
          className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Search users"
        />
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      {viewMode === 'table' ? (
        <UserTable
          data={filteredUsers}
          onEdit={(user) => navigate(`/dashboard/users/${user.id}/edit`)}
          onDelete={handleDelete}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onEdit={(u) => navigate(`/dashboard/users/${u.id}/edit`)}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <ConfirmModal
        isOpen={userToDelete !== null}
        onClose={() => setUserToDelete(null)}
        onConfirm={confirmDelete}
        title="Delete User"
        message={`Are you sure you want to delete ${userToDelete?.name ?? 'this user'}? This action cannot be undone.`}
        confirmText="Delete"
        variant="danger"
      />
    </div>
  );
}