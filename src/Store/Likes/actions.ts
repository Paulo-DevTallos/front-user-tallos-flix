import LikesRequests from '@/services/axios/LikesRequests';

export default {
  async getAllLikesComment({ commit }: any, data: any) {
    await LikesRequests.getAllLikesComment(data.id, data.userId).then(
      (data) => {
        commit('GET_LIKECOMMENT', data);
        commit('LIKE_lIST', data.data.resLike);
      },
    );
  },
  async createLikeComment({ commit }: any, userLike: Object) {
    await LikesRequests.createLikeComment(userLike).then((res) => {
      console.log(res);
    });
  },
};
