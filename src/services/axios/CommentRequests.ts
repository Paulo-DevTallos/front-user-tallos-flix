import { http } from './http'

export default {
    getAllComments: (token: any) => {
        return http.get('comments', token)
    },
    getCommentById: (id: string, token: any) => {
        return http.get(`comments/${id}`, token)
    },
    getByMovieId: (MovieId: string, token: any) => {
        return http.post(`comments/movie_id`, MovieId, token)
    },
    getByEmail: (Email: string, token: any) => {
        return http.post(`comments/mail`, Email, token)
    },
    createComment: (CommentData: object, token: any) => {
        return http.post(`comments`, CommentData, token)
    },
    updateComment: (id: string, CommentData: object, token: any) => {
        return http.put(`comments/${id}`, CommentData, token)
    },
    deleteComment: (id: string, token: any) => {
        return http.delete(`comments/${id}`, token)
    },

}