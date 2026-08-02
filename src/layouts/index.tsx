import { Outlet, useLocation } from 'react-router-dom';
import { Header } from '@/components/Layout/Header';
import { Sidebar } from '@/components/Layout/Sidebar';
import { Footer } from '@/components/Layout/Footer';

export function MainLayout() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Header />
      <div className="flex flex-1">
        {isDashboard && <Sidebar />}
        <main className={`flex-1 ${isDashboard ? 'lg:ml-64' : ''} p-4 lg:p-6`}>
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}

export function AuthLayout() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <Outlet />
    </div>
  );
}

export function DashboardLayout() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      <Sidebar />
      <div className="flex-1 lg:ml-64 flex flex-col">
        <Header />
        <main className="flex-1 p-4 lg:p-6">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}