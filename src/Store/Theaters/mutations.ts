export default {
  GET_THEATERS(state: any, payload: any) {
    state.Theaters = payload;
  },
  GET_THEATER(state: any, payload: any) {
    state.Theater = payload;
  },
  GET_THEATERS_LOCATION(state: any, payload: any) {
    state.NearTheaters = payload;
  },
};
