export default {
  GET_MOVIES(state: any, payload: any) {
    state.Movies = payload;
  },
  GET_SERIES(state: any, payload: any) {
    state.Series = payload;
  },
  setErrorPage(state: any, payload: any) {
    state.ErrorPage = payload;
  },
};
