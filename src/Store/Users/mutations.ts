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
  LOGIN(state: any, payload: any) {
    state.UserName = payload.name;
    state.UserEmail = payload.email;
    state.UserId = payload._id;
  },
  GET_AVATAR(state: any, payload: any) {
    state.UserAvatar = payload;
  },
};
