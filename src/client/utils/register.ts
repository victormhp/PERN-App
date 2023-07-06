import axios from '../api/axios';
import { type User } from '../models/user';

export async function registerUser<T extends Record<keyof T, any> = User>(data: T): Promise<boolean> {
  try {
    const userData = JSON.stringify(data);
    const res = await axios.post('/register', userData, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    });

    console.log(res);

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export async function loginUser<T extends Record<keyof T, any> = User>(data: T): Promise<boolean> {
  try {
    const userData = JSON.stringify(data);
    const res = await axios.post('login', userData, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    });

    console.log(res);

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}
