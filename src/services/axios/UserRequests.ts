import { http } from './http'

export default {
    getAllUsers: (token: any) => {
        return http.get('users', token)
    },
    getMe: (token: any) => {
        return http.get('users/me', token)
    },
    getUserById: (id: string, token: any) => {
        return http.get(`users/${id}`, token)
    },
    createUser: (userData: object, token: any) => {
        return http.post(`users`, userData, token)
    },
    usersPaginate: (limit: number, page: number, token: any) => {
        return http.post(`users/paginate?limit=${limit}&skip=${page}`, token)
    },
    updateUser: (id: string, userData: object, token: any) => {
        return http.put(`users/${id}`, userData, token)
    },
    deleteUser: (id: string, token: any) => {
        return http.delete(`users/${id}`, token)
    },

}