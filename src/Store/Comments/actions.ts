import CommentRequests from '@/services/axios/CommentRequests';
export default {
  async createComment({ commit }: any, data: any) {
    await CommentRequests.createComment(data.comment, {
      headers: { Authorization: data.jwt },
    })
      .then((res) => {
        commit();
      })
      .catch((error) => {
        commit();
      });
  },
  async updateComment({ commit }: any, data: any) {
    await CommentRequests.updateComment(data.id, data.comment, {
      headers: { Authorization: data.jwt },
    })
      .then((res) => {
        commit();
      })
      .catch((error) => {
        commit();
      });
  },
  async deleteComment({ commit }: any, data: any) {
    await CommentRequests.deleteComment(data.id, {
      headers: { Authorization: data.jwt },
    })
      .then((res) => {
        commit();
      })
      .catch((error) => {
        commit();
      });
  },
  async getAllComments({ commit }: any, data: any) {
    await CommentRequests.getAllComments({
      headers: { Authorization: data.jwt },
    })
      .then((res) => {
        commit('GET_COMMENTS', res.data);
      })
      .catch((error) => {
        commit();
      });
  },
  async getCommentById({ commit }: any, data: any) {
    await CommentRequests.getCommentById(data.id, {
      headers: { Authorization: data.jwt },
    })
      .then((res) => {
        commit('GET_COMMENT', res.data);
      })
      .catch((error) => {
        commit();
      });
  },
  async getByMovieId({ commit }: any, data: any) {
    await CommentRequests.getByMovieId(data.MovieId, {
      headers: { Authorization: data.jwt },
    })
      .then((res) => {
        commit('GET_COMMENTS', res.data);
      })
      .catch((error) => {
        commit();
      });
  },
  async getByEmail({ commit }: any, data: any) {
    await CommentRequests.getByEmail(data.Email, {
      headers: { Authorization: data.jwt },
    })
      .then((res) => {
        commit('GET_COMMENTS', res.data);
      })
      .catch((error) => {
        commit();
      });
  },
};
