import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { PageNotFound, Login, Register, ProtectedRoutes, PersistLogin } from '@/pages';
import { DashLayout, AuthLayout } from '@/layouts';
import { Notes } from '@/components';
import { useTheme } from '@/hooks';

const router = createBrowserRouter([
  {
    path: '/auth',
    Component: AuthLayout,
    children: [
      {
        path: 'login',
        Component: Login,
      },
      {
        path: 'register',
        Component: Register,
      },
    ],
  },
  {
    path: '/',
    Component: PersistLogin,
    children: [
      {
        path: '/',
        Component: ProtectedRoutes,
        children: [
          {
            path: '/',
            Component: DashLayout,
            children: [
              {
                path: '/',
                Component: Notes,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '*',
    Component: PageNotFound,
  },
]);

function App() {
  useTheme();
  return <RouterProvider router={router} />;
}

export default App;
