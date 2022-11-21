import RatingsRequest from '@/services/axios/RatingsRequest';

export default {
  async createRatingsMovie({ commit }: any, data: object) {
    await RatingsRequest.createRatingsMovie(data).then((data) => {
      console.log(data);
    });
  },
  async getAllRatingsMovie({ commit }: any, id: string) {
    await RatingsRequest.getAllRatingsMovie(id).then((res) => {
      commit('ALL_RATINGS', res.data);
    });
  },
  async getAllRatingsUser({ commit }: any, id: string) {
    await RatingsRequest.getAllRatingsUser(id).then((res) => {
      commit('ALL_RATINGS_USER', res.data);
    });
  },
  async updateRatingUser({ commit }: any, data: any) {
    await RatingsRequest.updateRatingUser(data.id, data.newRate).then((res) => {
      console.log(res);
    });
  },
};
