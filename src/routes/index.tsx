import { createBrowserRouter, Navigate } from 'react-router-dom';
import { MainLayout, AuthLayout } from '@/layouts';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { Home, NotFound, Unauthorized } from '@/pages';
import { Login, Register, ForgotPassword } from '@/features/auth/pages';
import { Dashboard } from '@/features/dashboard/pages';
import { UserList, CreateUser, EditUser, UserDetails } from '@/features/users/pages';
import { Profile, Account, Preferences, SeoSettings } from '@/features/settings/pages';
import { PageList, CreatePage, EditPage, PreviewPage } from '@/features/htmlChunk/pages';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      {
        path: 'unauthorized',
        element: <Unauthorized />,
      },
      {
        element: <PublicRoute />,
        children: [
          {
            element: <AuthLayout />,
            children: [
              { path: 'login', element: <Login /> },
              { path: 'register', element: <Register /> },
              { path: 'forgot-password', element: <ForgotPassword /> },
            ],
          },
        ],
      },
      {
        element: <PrivateRoute />,
        children: [
          { path: 'dashboard', element: <Dashboard /> },
          { path: 'dashboard/html-chunk', element: <PageList /> },
          { path: 'dashboard/html-chunk/create', element: <CreatePage /> },
          { path: 'dashboard/html-chunk/:id/edit', element: <EditPage /> },
          { path: 'dashboard/html-chunk/:id/preview', element: <PreviewPage /> },
          { path: 'dashboard/users', element: <UserList /> },
          { path: 'dashboard/users/create', element: <CreateUser /> },
          { path: 'dashboard/users/:id', element: <UserDetails /> },
          { path: 'dashboard/users/:id/edit', element: <EditUser /> },
          { path: 'dashboard/settings', element: <Navigate to="/dashboard/settings/profile" replace /> },
          { path: 'dashboard/settings/profile', element: <Profile /> },
          { path: 'dashboard/settings/account', element: <Account /> },
          { path: 'dashboard/settings/preferences', element: <Preferences /> },
          { path: 'dashboard/settings/seo', element: <SeoSettings /> },
        ],
      },
    ],
  },
]);