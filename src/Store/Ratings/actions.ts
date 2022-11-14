import RatingsRequest from '@/services/axios/RatingsRequest';

export default {
  async createRatingsMovie({ commit }: any, data: object) {
    await RatingsRequest.createRatingsMovie(data).then((data) => {
      console.log(data);
    });
  },
  async getAllRatingsUser({ commit }: any, id: string) {
    await RatingsRequest.getAllRatingsUser(id).then((res) => {
      commit('ALL_RATINGS', res.data);
    //   console.log(res.data);
    });
  },
};
