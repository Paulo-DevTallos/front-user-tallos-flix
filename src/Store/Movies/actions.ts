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
  async getSeries({ commit }: any, data?: any) {
    await MovieRequests.getSeries(data)
      .then((res) => {
        if (res.data.content.length === 0) {
          commit('setErrorPage', true);
        } else {
          commit('setErrorPage', false);
        }
        commit('GET_SERIES', res.data);
      })
      .catch((error) => {
        commit();
      });
  },
  async getMovieFilter({ commit }: any, data?: any) {
    await MovieRequests.getMovieFilter(data)
      .then((res) => {
        if (res.data.content.length === 0) {
          commit('setErrorPage', true);
        } else {
          commit('setErrorPage', false);
        }
        commit('GET_MOVIES', res.data);
      })
      .catch((error) => {
        commit();
        console.log(error);
      });
  },
  async getMovieFilterId({ commit }: any, data?: any) {
    await MovieRequests.getMovieFilterId(data)
      .then((res) => {
        commit('GET_MOVIES', res.data);
      })
      .catch((error) => {
        commit();
        console.log(error);
      });
  },
};
