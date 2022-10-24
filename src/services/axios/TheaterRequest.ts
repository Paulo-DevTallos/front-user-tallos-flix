import { http } from './http';

export default {
  getAllTheaters: (token: any) => {
    return http.get('theaters', token);
  },
  getTheaterById: (id: string, token: any) => {
    return http.get(`theaters/${id}`, token);
  },
  createTheater: (theaterData: object, token: any) => {
    return http.post(`theaters`, theaterData, token);
  },
  getTheatersByLocation: (cord: object, token: any) => {
    return http.post(`theaters/geoSearch}`, cord, token);
  },
  updateTheater: (id: string, theaterData: object, token: any) => {
    return http.put(`theaters/${id}`, theaterData, token);
  },
  deleteTheater: (id: string, token: any) => {
    return http.delete(`theaters/${id}`, token);
  },
};
