import FavoriteRequests from '@/services/axios/FavoritesRequests';

export default {
  async createFavorite({ commit }: any, data: any) {
    await FavoriteRequests.createFavorite(data)
      .then((res) => {
        commit();
      })
      .catch((error) => {
        commit();
      });
  },
  async updateFavorite({ commit }: any, data: any) {
    await FavoriteRequests.updateFavorite(data.id, data.user)
      .then((res) => {
        commit();
      })
      .catch((error) => {
        commit();
      });
  },
  async deleteFavorite({ commit }: any, data: any) {
    await FavoriteRequests.deleteFavorite(data.id)
      .then((res) => {
        commit();
      })
      .catch((error) => {
        commit();
      });
  },
  async getAllFavorites({ commit }: any) {
    await FavoriteRequests.getAllFavorites()
      .then((res) => {
        commit('GET_FAVORITES', res.data);
        console.log(res.data)
      })
      .catch((error) => {
        commit();
      });
  },
  async getFavoriteById({ commit }: any, data: any) {
    await FavoriteRequests.getFavoriteById(data.id)
      .then((res) => {
        commit('GET_FAVORITE', res.data);
      })
      .catch((error) => {
        commit();
      });
  },
};
