import CommentRequests from '@/services/axios/CommentRequests';
export default {
  async createComment({ commit }: any, data: any) {
    await CommentRequests.createComment(data.comment)
      .then((res) => {
        commit();
      })
      .catch((error) => {
        commit();
      });
  },
  async updateComment({ commit }: any, data: any) {
    await CommentRequests.updateComment(data.id, data.comment)
      .then((res) => {
        commit();
      })
      .catch((error) => {
        commit();
      });
  },
  async deleteComment({ commit }: any, data: any) {
    await CommentRequests.deleteComment(data.id)
      .then((res) => {
        commit();
      })
      .catch((error) => {
        commit();
      });
  },
  async getAllComments({ commit }: any) {
    await CommentRequests.getAllComments()
      .then((res) => {
        commit('GET_COMMENTS', res.data);
      })
      .catch((error) => {
        commit();
      });
  },
  async getCommentById({ commit }: any, data: any) {
    await CommentRequests.getCommentById(data.id)
      .then((res) => {
        commit('GET_COMMENT', res.data);
      })
      .catch((error) => {
        commit();
      });
  },
  async getByMovieId({ commit }: any, data: any) {
    await CommentRequests.getByMovieId(data)
      .then((res) => {
        commit('GET_COMMENTS', res.data);
      })
      .catch((error) => {
        commit();
      });
  },
  async getByEmail({ commit }: any, data: any) {
    await CommentRequests.getByEmail(data.Email)
      .then((res) => {
        commit('GET_COMMENTS', res.data);
      })
      .catch((error) => {
        commit();
      });
  },
};
