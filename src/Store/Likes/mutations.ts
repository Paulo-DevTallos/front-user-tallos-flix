export default {
  GET_LIKECOMMENT(state: any, payload: any) {
    state.getComment = payload;
  },
  LIKE_lIST(state: any, payload: any) {
    state.likeList.push(payload);
  },
};
