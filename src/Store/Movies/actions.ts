import MovieRequests from '@/services/axios/MovieRequests';
export default {
  async createMovie({ commit }: any, data: any) {
    await MovieRequests.createMovies(data.Movies);
  },
  async updateMovie({ commit }: any, data: any) {
    await MovieRequests.updateMovies(data.id, data.Movies);
  },
  async deleteMovie({ commit }: any, data: any) {
    await MovieRequests.deleteMovies(data.id);
  },
  async getAllMovies({ commit }: any) {
    await MovieRequests.getAllMovies().then((res) => {
      commit('GET_MOVIES', res.data);
    });
  },
  async getSeries({ commit }: any, data?: any) {
    await MovieRequests.getSeries(data).then((res) => {
      if (res.data.content.length === 0) {
        commit('setErrorPage', true);
      } else {
        commit('setErrorPage', false);
      }
      commit('GET_SERIES', res.data);
    });
  },
  async getMovieFilter({ commit }: any, data?: object) {
    await MovieRequests.getMovieFilter(data)
      .then((res) => {
        if (res.data.content.length === 0) {
          commit('setErrorPage', true);
        } else {
          commit('setErrorPage', false);
        }
        commit('GET_MOVIES', res.data);
        console.log(res);
    });
  },
  async getMovieFilterId({ commit }: any, data?: any) {
    await MovieRequests.getMovieFilterId(data)
      .then((res) => {
        commit('GET_MOVIES', res.data);
    });
  },
};
