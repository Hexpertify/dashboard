import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { store } from './app/store';
import { router } from './routes';
import './styles/reset.css';
import './styles/variables.css';
import './styles/globals.css';

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster
        position="top-right"
        gutter={8}
        toastOptions={{
          duration: 3500,
          style: {
            background: '#ffffff',
            color: '#111827',
            border: '1px solid #e5e7eb',
            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
            borderRadius: '0.75rem',
            fontSize: '0.875rem',
          },
          success: {
            iconTheme: { primary: '#2563eb', secondary: '#ffffff' },
          },
          error: {
            iconTheme: { primary: '#dc2626', secondary: '#ffffff' },
          },
        }}
      />
    </Provider>
  );
}

export default App;