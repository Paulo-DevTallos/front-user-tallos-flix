import { http } from './http';

export default {
    getAllLikesComment: () => {
        return http.get(`likes/${id}`)
    }
}