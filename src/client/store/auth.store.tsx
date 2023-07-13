import { create } from 'zustand';
import jwt_decode from 'jwt-decode';
import axios, { type AxiosResponse } from 'axios';
import { type LoginCredentials, type RegisterCredentials } from '../models/auth.models';

interface Profile {
  id: number;
  username: string;
  role: string;
}

interface State {
  accessToken: string | null;
  user: Profile | null;
  isAuth: boolean;
  persist: boolean;
}

interface Actions {
  setAuth: (accessToken: string) => void;
  register: (data: RegisterCredentials) => Promise<AxiosResponse<any, any> | undefined>;
  login: (data: LoginCredentials) => Promise<AxiosResponse<any, any> | undefined>;
  logout: () => void;
}

export const useAuthStore = create<State & Actions>((set) => ({
  accessToken: null,
  user: null,
  isAuth: false,
  persist: false,
  setAuth: (accessToken) =>
    set(() => ({
      accessToken,
      user: jwt_decode<Profile>(accessToken),
      isAuth: true,
    })),
  register: async (data: RegisterCredentials) => {
    try {
      const res = await axios.post('/api/auth/register', data, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });

      return res;
    } catch (error) {
      console.error(error);
    }
  },
  login: async (data: LoginCredentials) => {
    try {
      const res = await axios.post('/api/auth/login', data, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });

      return res;
    } catch (err) {
      console.error(err);
    }
  },
  logout: async () => {
    try {
      const res = await axios.post('/api/auth/logout');
      set(() => ({ accessToken: '', isAuth: false }));
      return res;
    } catch (err) {
      console.error(err);
    }
  },
}));
