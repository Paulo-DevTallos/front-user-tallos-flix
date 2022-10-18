import axios from 'axios'

export const http = axios.create({
    baseURL: 'url do banco',
    headers: {
        Authorization: 'Bearer token'
    }
})