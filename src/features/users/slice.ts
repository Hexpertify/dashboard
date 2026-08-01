import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { UserFormData, UserRecord, UsersState } from './types';

const initialState: UsersState = {
  list: [
    { id: '1', name: 'John Doe', email: 'john.doe@example.com', role: 'admin', status: 'active', department: 'Engineering', phone: '+1 555-0101', createdAt: '2024-01-15T10:30:00Z', lastLogin: '2026-07-30T08:12:00Z' },
    { id: '2', name: 'Jane Smith', email: 'jane.smith@example.com', role: 'manager', status: 'active', department: 'Marketing', phone: '+1 555-0102', createdAt: '2024-02-20T14:45:00Z', lastLogin: '2026-07-29T16:40:00Z' },
    { id: '3', name: 'Alice Johnson', email: 'alice.johnson@example.com', role: 'editor', status: 'active', department: 'Content', phone: '+1 555-0103', createdAt: '2024-03-05T09:15:00Z', lastLogin: '2026-07-28T11:05:00Z' },
    { id: '4', name: 'Bob Williams', email: 'bob.williams@example.com', role: 'viewer', status: 'inactive', department: 'Finance', phone: '+1 555-0104', createdAt: '2024-04-12T16:20:00Z', lastLogin: '2026-05-15T10:00:00Z' },
    { id: '5', name: 'Carol Brown', email: 'carol.brown@example.com', role: 'manager', status: 'suspended', department: 'Operations', phone: '+1 555-0105', createdAt: '2024-05-22T11:55:00Z', lastLogin: '2026-06-02T13:30:00Z' },
  ],
  currentUser: null,
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<UserRecord[]>) {
      state.list = action.payload;
    },
    setCurrentUser(state, action: PayloadAction<UserRecord | null>) {
      state.currentUser = action.payload;
    },
    addUser(state, action: PayloadAction<UserRecord>) {
      state.list.unshift(action.payload);
    },
    updateUser(state, action: PayloadAction<{ id: string; data: UserFormData }>) {
      const index = state.list.findIndex((u) => u.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = { ...state.list[index], ...action.payload.data };
      }
    },
    deleteUser(state, action: PayloadAction<string>) {
      state.list = state.list.filter((u) => u.id !== action.payload);
    },
    setUsersLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setUsersError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const {
  setUsers,
  setCurrentUser,
  addUser,
  updateUser,
  deleteUser,
  setUsersLoading,
  setUsersError,
} = usersSlice.actions;

export default usersSlice.reducer;