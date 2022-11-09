import FavoriteRequests from '@/services/axios/FavoritesRequests';

export default {
  async createFavorite({ commit }: any, data: any) {
    await FavoriteRequests.createFavorite(data);
  },
  async updateFavorite({ commit }: any, data: any) {
    await FavoriteRequests.updateFavorite(data.id, data.movie);
  },
  async deleteFavorite({ commit }: any, data: any) {
    await FavoriteRequests.deleteFavorite(data.id, data.movie);
  },
  async getAllFavorites({ commit }: any) {
    await FavoriteRequests.getAllFavorites().then((res) => {
      commit('GET_FAVORITES', res.data);
    });
  },
  async getFavoriteById({ commit }: any, data: any) {
    await FavoriteRequests.getFavoriteById(data).then((res) => {
      commit('GET_FAVORITE', res.data);
    });
  },
};
