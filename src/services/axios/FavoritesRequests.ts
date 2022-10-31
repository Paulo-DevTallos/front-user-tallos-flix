import { http } from './http';

export default {
  getAllFavorites: () => {
    return http.get('favorites');
  },
  getFavoriteById: (id: string) => {
    return http.get(`favorites/${id}`);
  },
  createFavorite: (favoriteData: object) => {
    return http.post(`favorites`, favoriteData);
  },
  updateFavorite: (id: string, favoriteData: object) => {
    return http.put(`favorites/add/${id}`, favoriteData);
  },
  deleteFavorite: (id: string, favoriteData: object) => {
    return http.put(`favorites/remove/${id}`, favoriteData);
  },
};
