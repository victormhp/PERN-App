import axios from './axios';

export interface RegisterCredentials {
  email: string;
  password: string;
  username: string;
}

export async function register(data: RegisterCredentials) {
  try {
    const res = await axios.post('/register', data, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    });

    return res;
  } catch (err) {
    console.error(err);
  }
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export async function login(data: LoginCredentials) {
  try {
    const res = await axios.post('/login', data, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    });

    return res;
  } catch (err) {
    console.error(err);
  }
}
