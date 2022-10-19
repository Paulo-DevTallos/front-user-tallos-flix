export default {
  GET_USERS(state: any, payload: any) {
    state.Users = payload;
  },
  GET_USER(state: any, payload: any) {
    state.User = payload;
  },
  GET_ME(state: any, payload: any) {
    state.Me = payload;
  },
};
