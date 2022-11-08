import LikesRequests from '@/services/axios/LikesRequests';

export default {
  async getAllLikesComment({ commit }: any, data: any) {
    await LikesRequests.getAllLikesComment(data.id, data.userId)
      .then((res) => {
        commit('GET_LIKECOMMENT', res);
        console.log(res);
      })
      .catch((error) => {
        commit();
      });
  },
};
