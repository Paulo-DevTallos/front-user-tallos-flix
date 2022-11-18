import UserRequests from '@/services/axios/UserRequests';
import jwtDecode from 'jwt-decode';

export default {
  async updateUser({ commit }: any, data: any) {
    await UserRequests.updateUser(data.id, data.user).then((res) => {
      commit('GET_AVATAR', res.data.avatar);
    });
  },
  async deleteUser({ commit }: any, data: any) {
    await UserRequests.deleteUser(data.id);
  },
  async getAllUsers({ commit }: any) {
    await UserRequests.getAllUsers().then((res) => {
      commit('GET_USERS', res.data);
    });
  },
  async getUserById({ commit }: any, data: any) {
    await UserRequests.getUserById(data.id).then((res) => {
      commit('GET_USER', res.data);
    });
  },
  async getAvatar({ commit }: any, data: any) {
    await UserRequests.getAvatar(data).then((res) => {
      commit('GET_AVATAR', res.data);
    });
  },
  async getMe({ commit }: any) {
    await UserRequests.getMe().then((res) => {
      commit('GET_ME', res.data);
    });
  },
  async getUsersPaginate({ commit }: any, data: any) {
    await UserRequests.usersPaginate(data.limit, data.skip).then((res) => {
      commit('GET_USERS', res.data);
    });
  },
  async login({ commit }: any, data: Object) {
    await UserRequests.login(data).then((res) => {
      if (res.data.access_token) {
        localStorage.setItem('token', res.data.access_token);

        const token = res.data.access_token;
        const decode = jwtDecode(token);

        commit('LOGIN', decode);
        //location.replace('/home');
      }
    });
  },
};
