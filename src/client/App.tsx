import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { PageNotFound, Login, Register, ProtectedRoutes, PersistLogin, Home } from './pages';
import { DashLayout, AuthLayout, HomeLayout } from './layouts';
import { Notes } from './components';
import { useTheme } from './hooks';

const router = createBrowserRouter([
  {
    path: '/',
    Component: HomeLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
    ],
  },
  {
    path: '/',
    Component: AuthLayout,
    children: [
      {
        path: '/login',
        Component: Login,
      },
      {
        path: '/register',
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
            path: '/dashboard',
            Component: DashLayout,
            children: [
              {
                path: '/dashboard',
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
