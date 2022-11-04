import LikesRequests from '@/services/axios/LikesRequests';

export default {
  async getAllLikesComment({ commit }: any, data: any) {
    await LikesRequests.getAllLikesComment(data)
      .then((res) => {
        commit('GET_LIKECOMMENT', res.data);
      })
      .catch((error) => {
        commit();
      });
  },
};
