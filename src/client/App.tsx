import { PageLoading } from '@/pages';
import { useTheme } from '@/hooks';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useEffect, useState } from 'react';

const router = createBrowserRouter([
  {
    path: '/auth',
    async lazy() {
      const { AuthLayout } = await import('./layouts');
      return { Component: AuthLayout };
    },
    children: [
      {
        path: 'login',
        async lazy() {
          const { Login } = await import('./pages');
          return { Component: Login };
        },
      },
      {
        path: 'register',
        async lazy() {
          const { Register } = await import('./pages');
          return { Component: Register };
        },
      },
    ],
  },
  {
    path: '/',
    async lazy() {
      const { PersistLogin } = await import('./pages');
      return { Component: PersistLogin };
    },
    children: [
      {
        path: '/',
        async lazy() {
          const { ProtectedRoutes } = await import('./pages');
          return { Component: ProtectedRoutes };
        },
        children: [
          {
            path: '/',
            async lazy() {
              const { DashLayout } = await import('./layouts');
              return { Component: DashLayout };
            },
            children: [
              {
                path: '/',
                async lazy() {
                  const { Notes } = await import('./components');
                  return { Component: Notes };
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '*',
    async lazy() {
      const { PageLoading } = await import('./pages');
      return { Component: PageLoading };
    },
  },
]);

function App() {
  useTheme();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return isLoading ? <PageLoading /> : <RouterProvider router={router} />;
}

export default App;
