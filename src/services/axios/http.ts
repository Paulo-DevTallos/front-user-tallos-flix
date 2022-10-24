import { API_URL } from '@/constants';
import axios from 'axios';


export const http = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});
