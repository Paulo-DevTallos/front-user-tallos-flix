export default {
  GET_MOVIES(state: any, payload: any) {
    state.Movies = payload;
  },
  GET_SERIES(state: any, payload: any) {
    state.Series = payload;
  },
  GET_MOVIES_COUNT(state: any, payload: any) {
    state.MoviesCount = payload;
  },
  GET_MOVIE(state: any, payload: any) {
    state.Movie = payload;
  },
};
