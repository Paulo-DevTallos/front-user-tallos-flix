import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../pages/LoginView.vue'),
    },
    {
      path: '/home/favorites',
      name: 'favorites',
      component: () => import('../pages/Favorites/MyFavorites.vue'),
    },
    {
      path: '/home',
      name: 'default',
      component: () => import('../layouts/DefaultLayout.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('../pages/HomeView.vue'),
        },
        {
          path: 'theaters',
          name: 'theaters',
          component: () => import('../pages/Theaters/TheatersView.vue'),
        },
        {
          path: 'movie',
          name: 'movie',
          component: () => import('../pages/Movies/MovieView.vue'),
        },
        {
          path: 'series',
          name: 'series',
          component: () => import('../pages/Series/SeriesView.vue'),
        },
        {
          path: 'movies',
          name: 'movies',
          component: () => import('../pages/Movies/MoviesView.vue'),
        },
        {
          path: 'movieLocation/:id',
          name: 'movieLocation',
          component: () => import('../pages/Theaters/MovieLocation.vue'),
        },
      ],
    },
    { 
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../components/ErrorComponent.vue'), 
    },
  ],
});


export default router;
