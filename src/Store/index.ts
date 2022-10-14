import { createStore } from "vuex";
import Movies from "./Movies/MovieStore"
import Theaters from "./Theaters/TheaterStore"
import Users from "./Users/UserStore"

export default createStore({
    modules: {
        Users,
        Theaters,
        Movies
    }
})