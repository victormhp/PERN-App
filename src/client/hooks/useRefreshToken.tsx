import { axiosAuth } from '@/libs/axios';
import { useAuthStore } from '@/store';

function useRefreshToken() {
  const setAuth = useAuthStore((state) => state.setAuth);

  const refresh = async (): Promise<string> => {
    const res = await axiosAuth.get('/auth/refresh', {
      withCredentials: true,
    });
    const accessToken: string = res.data.accessToken;
    setAuth(accessToken);
    return accessToken;
  };

  return refresh;
}

export default useRefreshToken;
