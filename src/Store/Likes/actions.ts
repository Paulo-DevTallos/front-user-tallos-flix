import LikesRequests from '@/services/axios/LikesRequests';

export default {
  async getAllLikesComment({ commit }: any, data: any) {
    await LikesRequests.getAllLikesComment(data.id, data.userId).then(
      (data) => {
        commit('GET_LIKECOMMENT', data);
        console.log(data);
      },
    );
  },
  async createLikeComment({ commit }: any, data: any) {
    await LikesRequests.createLikeComment(data).then((data) => {
      commit('GET_LIKECOMMENT', data);
      console.log(data);
    });
  },
};
