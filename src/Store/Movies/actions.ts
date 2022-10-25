import MovieRequests from '@/services/axios/MovieRequests';
export default {
  async createMovie({ commit }: any, data: any) {
    await MovieRequests.createMovies(data.Movies)
      .then((res) => {
        commit();
      })
      .catch((error) => {
        commit();
      });
  },
  async updateMovie({ commit }: any, data: any) {
    await MovieRequests.updateMovies(data.id, data.Movies)
      .then((res) => {
        commit();
      })
      .catch((error) => {
        commit();
      });
  },
  async deleteMovie({ commit }: any, data: any) {
    await MovieRequests.deleteMovies(data.id)
      .then((res) => {
        commit();
      })
      .catch((error) => {
        commit();
      });
  },
  async getAllMovies({ commit }: any) {
    await MovieRequests.getAllMovies()
      .then((res) => {
        commit('GET_MOVIES', res.data);
      })
      .catch((error) => {
        commit();
      });
  },
  async getSeries({ commit }: any) {
    await MovieRequests.getSeries()
      .then((res) => {
        commit('GET_SERIES', res.data);
      })
      .catch((error) => {
        commit();
      });
  },
  async getMovieFilter({ commit }: any) {
    await MovieRequests.getMovieFilter()
      .then((res) => {
        commit('GET_MOVIES', res.data);
      })
      .catch((error) => {
        commit();
      });
  },
};
