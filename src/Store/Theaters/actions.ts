import TheaterRequests from '@/services/axios/TheaterRequest';
export default {
  async createTheater({ commit }: any, data: any) {
    await TheaterRequests.createTheater(data.theater);
  },
  async updateTheater({ commit }: any, data: any) {
    await TheaterRequests.updateTheater(data.id, data.theater);
  },
  async deleteTheater({ commit }: any, data: any) {
    await TheaterRequests.deleteTheater(data.id);
  },
  async getAllTheaters({ commit }: any) {
    await TheaterRequests.getAllTheaters().then((res) => {
      commit('GET_THEATERS', res.data);
    });
  },
  async getTheaterById({ commit }: any, data: any) {
    await TheaterRequests.getTheaterById(data.id).then((res) => {
      commit('GET_THEATER', res.data);
    });
  },
  async getTheatersBylocation({ commit }: any, data: any) {
    await TheaterRequests.getTheatersByLocation(data).then((res) => {
      commit('GET_THEATERS_LOCATION', res.data);
    });
  },
  async getTheatersByCity({ commit }: any, data: any) {
    console.log(data);
    await TheaterRequests.getTheatersByCity(data).then((res) => {
      commit('GET_THEATERS_LOCATION', res.data);
    });
  },
};
