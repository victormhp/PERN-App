import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store';

function ProtectedRoutes() {
  const isAuth = useAuthStore.getState().isAuth;
  const location = useLocation();

  if (!isAuth) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return <Outlet />;
}

export default ProtectedRoutes;
