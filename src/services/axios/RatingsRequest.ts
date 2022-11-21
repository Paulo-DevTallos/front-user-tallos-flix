import { http } from './http';

export default {
	createRatingsMovie: (data: Object) => {
		return http.post(`ratings`, data);
	},
	getAllRatingsMovie: (id: string) => {
		return http.get(`ratings/movie/${id}`);
	},
	getAllRatingsUser: (id: string) => {
		return http.get(`ratings/${id}`);
	},
	updateRatingUser: (id: string, newRate: Object) => {
		return http.put(`ratings/add/${id}`, newRate);
	},
	removeRating: (id: string, delRate: Object) => {
		return http.put(`ratings/remove/${id}`, delRate);
	},
};
