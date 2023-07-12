import axios from '../libs/axios';
import { useAuthStore } from '../store';

function useRefreshToken() {
  const setAuth = useAuthStore((state) => state.setAuth);

  const refresh = async (): Promise<string> => {
    const res = await axios.get('/refresh', {
      withCredentials: true,
    });
    const accessToken: string = res.data.accessToken;
    setAuth(accessToken);
    console.log(accessToken);
    return accessToken;
  };

  return refresh;
}

export default useRefreshToken;
