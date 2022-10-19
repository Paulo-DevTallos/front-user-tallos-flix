import UserRequests from '@/services/axios/UserRequests';
import jwtDecode from 'jwt-decode';

export default {
  async createUser({ commit }: any, data: any) {
    await UserRequests.createUser(data.user, {
      headers: { Authorization: data.jwt },
    })
      .then((res) => {
        commit();
      })
      .catch((error) => {
        commit();
      });
  },
  async updateUser({ commit }: any, data: any) {
    await UserRequests.updateUser(data.id, data.user, {
      headers: { Authorization: data.jwt },
    })
      .then((res) => {
        commit();
      })
      .catch((error) => {
        commit();
      });
  },
  async deleteUser({ commit }: any, data: any) {
    await UserRequests.deleteUser(data.id, {
      headers: { Authorization: data.jwt },
    })
      .then((res) => {
        commit();
      })
      .catch((error) => {
        commit();
      });
  },
  async getAllUsers({ commit }: any) {
    await UserRequests.getAllUsers()
      .then((res) => {
        commit('GET_USERS', res.data);
        console.log(res.data)
      })
      .catch((error) => {
        commit();
      });
  },
  async getUserById({ commit }: any, data: any) {
    await UserRequests.getUserById(data.id, {
      headers: { Authorization: data.jwt },
    })
      .then((res) => {
        commit('GET_USER', res.data);
      })
      .catch((error) => {
        commit();
      });
  },
  async getMe({ commit }: any, data: any) {
    await UserRequests.getMe({
      headers: { Authorization: data.jwt },
    })
      .then((res) => {
        commit('GET_ME', res.data);
      })
      .catch((error) => {
        commit();
      });
  },
  async getUsersPaginate({ commit }: any, data: any) {
    await UserRequests.usersPaginate(data.limit, data.skip, {
      headers: { Authorization: data.jwt },
    })
      .then((res) => {
        commit('GET_USERS', res.data);
      })
      .catch((error) => {
        commit();
      });
  },
  async login({ commit }: any, data: Object) {
    await UserRequests.login(data)
      .then((res) => {

        if (res.data.access_token) {
          localStorage.setItem('token', res.data.access_token);

          const token = res.data.access_token
          const decode = jwtDecode(token)

          commit('LOGIN', decode);

          location.replace('/home');
        }
      })
      .catch((error) => {
        commit();
      });
  },
};
