export default {
  GET_COMMENTS(state: any, payload: any) {
    state.Comments = payload;
  },
  GET_COMMENT(state: any, payload: any) {
    state.Comment = payload;
  },
};
