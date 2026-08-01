export type UserStatus = 'active' | 'inactive' | 'suspended';
export type UserRole = 'admin' | 'manager' | 'editor' | 'viewer';

export interface UserRecord {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  avatar?: string;
  phone?: string;
  department?: string;
  createdAt: string;
  lastLogin?: string;
}

export interface UserFormData {
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  phone: string;
  department: string;
}

export interface UsersState {
  list: UserRecord[];
  currentUser: UserRecord | null;
  loading: boolean;
  error: string | null;
}

export const initialUserFormData: UserFormData = {
  name: '',
  email: '',
  role: 'viewer',
  status: 'active',
  phone: '',
  department: '',
};