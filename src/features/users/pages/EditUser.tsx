import { Link, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { updateUser } from '../slice';
import { UserForm } from '../components/UserForm';
import type { UserFormData } from '../types';

export function EditUser() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const user = useAppSelector((state) => state.users.list.find((u) => u.id === id));

  if (!user) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">User not found</h1>
        <p className="text-gray-500 dark:text-gray-400">The user you're trying to edit doesn't exist.</p>
        <Link to="/dashboard/users" className="text-blue-600 dark:text-blue-400 hover:underline">
          Back to users
        </Link>
      </div>
    );
  }

  const handleSubmit = (data: UserFormData) => {
    dispatch(updateUser({ id: user.id, data }));
    toast.success(`User "${data.name}" updated successfully`);
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
          <Link to={`/dashboard/users/${user.id}`} className="hover:text-blue-600 dark:hover:text-blue-400">
            {user.name}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700 dark:text-gray-300">Edit</span>
        </nav>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Edit User</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Update details for {user.name}</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <UserForm
          initialValues={{
            name: user.name,
            email: user.email,
            role: user.role,
            status: user.status,
            phone: user.phone ?? '',
            department: user.department ?? '',
          }}
          submitLabel="Save Changes"
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}