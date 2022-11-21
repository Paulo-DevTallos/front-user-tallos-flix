export default {
  GET_LIKECOMMENT(state: any, payload: any) {
    state.getComment = payload;
  },
  LIKE_lIST(state: any, payload: any) {
    state.likeList.push(payload);
  },
  LIKE_LIST_UPDATE(state: any, payload: any) {
    if (
      (state.likeList[payload.index] === 'LIKE' &&
        payload.deslike === false &&
        payload.Islike === false) ||
      (state.likeList[payload.index] === 'UNLIKE' &&
        payload.deslike === false &&
        payload.Islike === false)
    ) {
      state.likeList[payload.index] = 'NOT';
    } else if (
      state.likeList[payload.index] === 'NOT' &&
      payload.deslike === false
    ) {
      state.likeList[payload.index] = 'LIKE';
    } else if (
      state.likeList[payload.index] === 'UNLIKE' &&
      payload.Islike === true
    ) {
      state.likeList[payload.index] = 'LIKE';
    } else if (
      (state.likeList[payload.index] = 'LIKE' && payload.Islike === true)
    ) {
      state.likeList[payload.index] = 'UNLIKE';
    } else {
      state.likeList[payload.index] = 'UNLIKE';
    }
  },
  LIKE_lIST_RESPONSE(state: any, payload: any) {
    state.likeListResponses.push(payload);
  },
  LIKE_LIST_RESPONSE_UPDATE(state: any, payload: any) {
    if (
      (state.likeListResponses[payload.index] === 'LIKE' &&
        payload.deslike === false &&
        payload.Islike === false) ||
      (state.likeListResponses[payload.index] === 'UNLIKE' &&
        payload.deslike === false &&
        payload.Islike === false)
    ) {
      state.likeListResponses[payload.index] = 'NOT';
    } else if (
      state.likeListResponses[payload.index] === 'NOT' &&
      payload.deslike === false
    ) {
      state.likeListResponses[payload.index] = 'LIKE';
    } else if (
      state.likeListResponses[payload.index] === 'UNLIKE' &&
      payload.Islike === true
    ) {
      state.likeListResponses[payload.index] = 'LIKE';
    } else if (
      (state.likeListResponses[payload.index] =
        'LIKE' && payload.Islike === true)
    ) {
      state.likeListResponses[payload.index] = 'UNLIKE';
    } else {
      state.likeListResponses[payload.index] = 'UNLIKE';
    }
  },
};
