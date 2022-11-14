export default {
  GET_LIKECOMMENT(state: any, payload: any) {
    state.getComment = payload;
  },
  LIKE_lIST(state: any, payload: any) {
    state.likeList.push(payload);
  },
  LIKE_LIST_UPDATE(state: any, payload: any) {
    if(state.likeList[payload] === 'LIKE'){
      state.likeList[payload] = 'NOT';
    }
    else if(state.likeList[payload] === 'NOT'){
      state.likeList[payload] = 'LIKE';
    }
  },
};
