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
      path: '/home',
      name: 'default',
      component: () => import('../layouts/DefaultLayout.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('../pages/MovieView.vue'),
        },
        {
          path: 'theaters',
          name: 'theaters',
          component: () => import('../pages/Theaters/TheatersView.vue'),
        },
      ],
    },
  ],
});

export default router;
