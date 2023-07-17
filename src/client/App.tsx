import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { PageNotFound, Login, Register, ProtectedRoutes, PersistLogin } from './pages';
import { DashLayout, AuthLayout } from './layouts';
import { Notes } from './components';

const router = createBrowserRouter([
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
  return <RouterProvider router={router} />;
}

export default App;
