export default {
  GET_LIKECOMMENT(state: any, payload: any) {
    state.getComment = payload;
  },
  LIKE_lIST(state: any, payload: any) {
    state.likeList.push(payload);
  },
  LIKE_LIST_UPDATE(state: any, payload: any) {
    if (
      state.likeList[payload.index] === 'LIKE' ||
      state.likeList[payload.index] === 'UNLIKE'
    ) {
      state.likeList[payload.index] = 'NOT';
    } else if (
      state.likeList[payload.index] === 'NOT' &&
      payload.deslike === false
    ) {
      state.likeList[payload.index] = 'LIKE';
    } else {
      state.likeList[payload.index] = 'UNLIKE';
    }
  },
};
