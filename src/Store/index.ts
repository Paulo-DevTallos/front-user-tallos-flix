import { createStore } from 'vuex';
import Movies from './Movies/MovieStore';
import Theaters from './Theaters/TheaterStore';
import Users from './Users/UserStore';
import Comments from './Comments/CommentStore';
import createPersistedState from 'vuex-persistedstate';

const store = createStore({
  modules: {
    Users,
    Theaters,
    Movies,
    Comments,
  },
  plugins: [createPersistedState()],
});
export default store;
