import PeopleRequests from '@/services/axios/PeoplesRequest';
export default {
  async getPeopleByName({ commit }: any, data: any) {
    console.log(data);
    await PeopleRequests.getPeopleByName(data).then((res) => {
      commit('GET_PEOPLE', res.data);
    });
  },
};
