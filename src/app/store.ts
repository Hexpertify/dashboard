import { configureStore } from '@reduxjs/toolkit';
import settingsReducer from '@/features/settings/slice';
import authReducer from '@/features/auth/slice';
import dashboardReducer from '@/features/dashboard/slice';
import usersReducer from '@/features/users/slice';
import htmlChunkReducer from '@/features/htmlChunk/slice';

export const store = configureStore({
  reducer: {
    settings: settingsReducer,
    auth: authReducer,
    dashboard: dashboardReducer,
    users: usersReducer,
    htmlChunk: htmlChunkReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;