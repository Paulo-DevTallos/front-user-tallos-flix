export default {
  GET_FAVORITES(state: any, payload: any) {
    state.Favorites = payload;
  },
  GET_FAVORITE(state: any, payload: any) {
    state.Favorite = payload;
  },
};
