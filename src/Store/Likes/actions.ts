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
  async createLikeComment({ commit }: any, userLike: any) {
    await LikesRequests.createLikeComment(userLike.like).then((res) => {
      commit('LIKE_LIST_UPDATE', {
        index: userLike.index,
        deslike: userLike.deslike,
        Islike: userLike.Islike,
      });
    });
  },
  async getAllLikesCommentResponse({ commit }: any, data: any) {
    await LikesRequests.getAllLikesComment(data.id, data.userId).then(
      (data) => {
        commit('GET_LIKECOMMENT', data);
        commit('LIKE_lIST_RESPONSE', data.data.resLike);
      },
    );
  },
  async createLikeCommentResponse({ commit }: any, userLike: any) {
    await LikesRequests.createLikeComment(userLike.like).then((res) => {
      commit('LIKE_LIST_RESPONSE_UPDATE', {
        index: userLike.index,
        deslike: userLike.deslike,
        Islike: userLike.Islike,
      });
    });
  },
};
