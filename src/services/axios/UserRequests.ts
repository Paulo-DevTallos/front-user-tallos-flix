import { http } from './http';

export default {
  getAllUsers: () => {
    return http.get('users');
  },
  getMe: () => {
    return http.get('users/me');
  },
  getUserById: (id: string) => {
    return http.get(`users/${id}`);
  },
  getAvatar: (email: string) => {
    return http.get(`users/avatar/${email}`);
  },
  createUser: (userData: object) => {
    return http.post(`users/public`, userData);
  },
  usersPaginate: (limit: number, page: number) => {
    return http.post(`users/paginate?limit=${limit}&skip=${page}`);
  },
  updateUser: (id: string, userData: object) => {
    return http.put(`users/${id}`, userData);
  },
  deleteUser: (id: string) => {
    return http.delete(`users/${id}`);
  },
  login: (userData: object) => {
    return http.post(`login`, userData);
  },
};
