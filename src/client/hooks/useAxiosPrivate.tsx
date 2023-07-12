import { useEffect } from 'react';
import { useAuthStore } from '../store';
import { axiosPrivate } from '../libs/axios';
import useRefreshToken from './useRefreshToken';

function useAxiosPrivate() {
  const refresh = useRefreshToken();
  const isAuth = useAuthStore.getState().isAuth;
  const accessToken = useAuthStore.getState().accessToken;

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers.Authorization && accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      async (error) => await Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          prevRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return await axiosPrivate(prevRequest);
        }
        return await Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [isAuth, refresh]);

  return axiosPrivate;
}

export default useAxiosPrivate;
