import MovieRequests from '@/services/axios/MovieRequests';
export default {
  async createMovie({ commit }: any, data: any) {
    await MovieRequests.createMovies(data.Movies, {
      headers: { Authorization: data.jwt },
    })
      .then((res) => {
        commit();
      })
      .catch((error) => {
        commit();
      });
  },
  async updateMovie({ commit }: any, data: any) {
    await MovieRequests.updateMovies(data.id, data.Movies, {
      headers: { Authorization: data.jwt },
    })
      .then((res) => {
        commit();
      })
      .catch((error) => {
        commit();
      });
  },
  async deleteMovie({ commit }: any, data: any) {
    await MovieRequests.deleteMovies(data.id, {
      headers: { Authorization: data.jwt },
    })
      .then((res) => {
        commit();
      })
      .catch((error) => {
        commit();
      });
  },
  async getAllMovies({ commit }: any, data: any) {
    await MovieRequests.getAllMovies({
      headers: { Authorization: data.jwt },
    })
      .then((res) => {
        commit('GET_MOVIES', res.data);
      })
      .catch((error) => {
        commit();
      });
  },
  async getAllSeries({ commit }: any, data: any) {
    await MovieRequests.getAllSeries({
      headers: { Authorization: data.jwt },
    })
      .then((res) => {
        commit('GET_SERIES', res.data);
      })
      .catch((error) => {
        commit();
      });
  },
  async findAndCount({ commit }: any, data: any) {
    await MovieRequests.findAndCount({
      headers: { Authorization: data.jwt },
    })
      .then((res) => {
        commit('GET_MOVIES_COUNT', res.data);
      })
      .catch((error) => {
        commit();
      });
  },
  async getMovieById({ commit }: any, data: any) {
    await MovieRequests.getMovieById(data.id, {
      headers: { Authorization: data.jwt },
    })
      .then((res) => {
        commit('GET_MOVIE', res.data);
      })
      .catch((error) => {
        commit();
      });
  },
  async moviesCategory({ commit }: any, data: any) {
    await MovieRequests.moviesCategory(data.MovieGenre, {
      headers: { Authorization: data.jwt },
    })
      .then((res) => {
        commit('GET_MOVIES', res.data);
      })
      .catch((error) => {
        commit();
      });
  },
  async moviesDirectors({ commit }: any, data: any) {
    await MovieRequests.moviesDirectors(data.MovieDirector, {
      headers: { Authorization: data.jwt },
    })
      .then((res) => {
        commit('GET_MOVIES', res.data);
      })
      .catch((error) => {
        commit();
      });
  },
  async moviesCast({ commit }: any, data: any) {
    await MovieRequests.moviesCast(data.MovieCast, {
      headers: { Authorization: data.jwt },
    })
      .then((res) => {
        commit('GET_MOVIES', res.data);;
      })
      .catch((error) => {
        commit();
      });
  },
  async moviesLetter({ commit }: any, data: any) {
    await MovieRequests.moviesLetter(data.MovieLetter, {
      headers: { Authorization: data.jwt },
    })
      .then((res) => {
        commit('GET_MOVIES', res.data);
      })
      .catch((error) => {
        commit();
      });
  },
  async getMoviesPaginates({ commit }: any, data: any) {
    await MovieRequests.moviesPaginates(data.limit, data.skip, {
      headers: { Authorization: data.jwt },
    })
      .then((res) => {
        commit('GET_MOVIES', res.data);
      })
      .catch((error) => {
        commit();
      });
  },
  async moviesYear({ commit }: any, data: any) {
    await MovieRequests.moviesYear(data.MovieYear, {
      headers: { Authorization: data.jwt },
    })
      .then((res) => {
        commit('GET_MOVIES', res.data);
      })
      .catch((error) => {
        commit();
      });
  },
};
