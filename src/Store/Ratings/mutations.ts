export default {
  ALL_RATINGS(state: any, payload: any) {
    state.RatingsMovie = payload;
  },
  ALL_RATINGS_USER(state: any, payload: any) {
    state.RatingsUser = payload;
  },
};
