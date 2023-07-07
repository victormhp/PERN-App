import axios from './axios';
import { type User } from '../models/user';

export async function registerUser(data: User) {
  try {
    const userData = JSON.stringify(data);
    const res = await axios.post('/register', userData, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    });

    return res;
  } catch (err) {
    console.error(err);
  }
}

export async function loginUser(email: string, password: string) {
  try {
    const res = await axios.post(
      '/login',
      { email, password },
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      }
    );

    return res;
  } catch (err) {
    console.error(err);
  }
}
