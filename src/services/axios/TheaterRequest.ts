import { http } from './http';

export default {
  getAllTheaters: () => {
    return http.get('theaters');
  },
  getTheaterById: (id: string) => {
    return http.get(`theaters/${id}`);
  },
  createTheater: (theaterData: object) => {
    return http.post(`theaters`, theaterData);
  },
  getTheatersByLocation: (cord: object) => {
    return http.post(`theaters/geoSearch`, cord);
  },
  updateTheater: (id: string, theaterData: object) => {
    return http.put(`theaters/${id}`, theaterData);
  },
  deleteTheater: (id: string) => {
    return http.delete(`theaters/${id}`);
  },
};
