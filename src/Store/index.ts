import { createStore } from 'vuex';
import Movies from './Movies/MovieStore';
import Theaters from './Theaters/TheaterStore';
import Users from './Users/UserStore';
import Comments from './Comments/CommentStore';
import Favorites from './Favorites/FavoriteStore';
import Likes from './Likes/LikesStore';
import createPersistedState from 'vuex-persistedstate';

const store = createStore({
  modules: {
    Users,
    Theaters,
    Movies,
    Comments,
    Favorites,
    Likes
  },
  plugins: [createPersistedState()],
});
export default store;
