import RatingsRequest from '@/services/axios/RatingsRequest';

export default {
  async createRatingsMovie({ commit }: any, data: object) {
    await RatingsRequest.createRatingsMovie(data).then((data) => {
      console.log(data);
    });
  },
};
