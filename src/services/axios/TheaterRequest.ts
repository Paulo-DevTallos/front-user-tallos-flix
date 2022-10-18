import { http } from './http'

export default {
    getAllTheaters: (token: any) => {
        return http.get('theaters', token)
    },
    getTheaterById: (id: string, token: any) => {
        return http.get(`theaters/${id}`, token)
    },
    createtheater: (theaterData: object, token: any) => {
        return http.post(`theaters`, theaterData, token)
    },
    getTheatersByLocation: (cord: object, token: any) => {
        return http.post(`theaters/geoSearch}`, cord, token)
    },
    updatetheater: (id: string, theaterData: object, token: any) => {
        return http.put(`theaters/${id}`, theaterData, token)
    },
    deletetheater: (id: string, token: any) => {
        return http.delete(`theaters/${id}`, token)
    },
}