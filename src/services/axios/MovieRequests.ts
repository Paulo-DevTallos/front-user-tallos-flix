import { http } from './http'

export default {
    getAllMovies: (token: any) => {
        return http.get('movies', token)
    },
    getAllSeries: (token: any) => {
        return http.get('movies/series', token)
    },
    findAndCount: (token: any) => {
        return http.get('movies/count', token)
    },
    getMovieById: (id: string, token: any) => {
        return http.get(`movies/${id}`, token)
    },
    createMovies: (MoviesData: object, token: any) => {
        return http.post(`movies`, MoviesData, token)
    },
    moviesCategory: (MovieGenre: string, token: any) => {
        return http.post(`movies/category`, MovieGenre, token)
    },
    moviesDirectors: (MovieDirector: string, token: any) => {
        return http.post(`movies/directors`, MovieDirector, token)
    },
    moviesCast: (MovieCast: string, token: any) => {
        return http.post(`movies/cast`, MovieCast, token)
    },
    moviesLetter: (MovieLetter: string, token: any) => {
        return http.post(`movies/letter`, MovieLetter, token)
    },
    moviesPaginates: (limit: number, page: number, token: any) => {
        return http.post(`movies/paginates?limit=${limit}&skip=${page}`, token)
    },
    moviesYear: (MovieYear: number, token: any) => {
        return http.post(`movies/year`, MovieYear, token)
    },
    updateMovies: (id: string, MoviesData: object, token: any) => {
        return http.put(`movies/${id}`, MoviesData, token)
    },
    deleteMovies: (id: string, token: any) => {
        return http.delete(`movies/${id}`, token)
    },

}