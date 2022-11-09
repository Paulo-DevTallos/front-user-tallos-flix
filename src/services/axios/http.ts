const API_URL = import.meta.env.VITE_API_URL;
import axios from 'axios';

export const http = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});
