import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAppDispatch } from '@/app/hooks';
import { addUser } from '../slice';
import { UserForm } from '../components/UserForm';
import { generateId } from '@/utils/helpers';
import type { UserFormData, UserRecord } from '../types';

export function CreateUser() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = (data: UserFormData) => {
    const newUser: UserRecord = {
      id: generateId('usr_'),
      ...data,
      createdAt: new Date().toISOString(),
      lastLogin: undefined,
    };
    dispatch(addUser(newUser));
    toast.success(`User "${data.name}" created successfully`);
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
          <span className="text-gray-700 dark:text-gray-300">Create User</span>
        </nav>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create User</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Add a new user to the system</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <UserForm submitLabel="Create User" onSubmit={handleSubmit} />
      </div>
    </div>
  );
}