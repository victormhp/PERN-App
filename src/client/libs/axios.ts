import axios from 'axios';

const baseURL = import.meta.env.PROD ? import.meta.env.VITE_API_URL : 'http://localhost:3000/api';

export const axiosAuth = axios.create({
  baseURL,
});

export const axiosPrivate = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});
