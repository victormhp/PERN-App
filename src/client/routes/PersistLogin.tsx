import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuthStore } from '../store';
import { useRefreshToken } from '../hooks';

function PersistLogin() {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const accessToken = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    // persist added here AFTER tutorial video
    // Avoids unwanted call to verifyRefreshToken
    void (!accessToken ? verifyRefreshToken() : setIsLoading(false));

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    console.log(`isLoading: ${isLoading.toString()}`);
    console.log(`aT: ${JSON.stringify(accessToken)}`);
  }, [isLoading]);

  return <>{isLoading ? <p>Loading</p> : <Outlet />}</>;
}

export default PersistLogin;
