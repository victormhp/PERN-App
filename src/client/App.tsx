import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { PageNotFound, DashLayout, Login, Register, AuthLayout, ProtectedRoutes } from './routes';
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
  {
    path: '*',
    Component: PageNotFound,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
