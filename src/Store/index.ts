import { createStore } from "vuex";
import Movies from "./Movies/MovieStore"
import Theaters from "./Theaters/TheaterStore"
import Users from "./Users/UserStore"
import Comments from "./Comments/CommentStore"

export default createStore({
    modules: {
        Users,
        Theaters,
        Movies,
        Comments
    }
})