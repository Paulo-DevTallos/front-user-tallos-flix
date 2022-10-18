import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../pages/LoginView.vue'),
    },
    {
      path: '/',
      name: 'home',
      component: () => import('../layouts/DefaultLayout.vue'),
      redirect: '/home',
      children: [
        {
          path: 'home',
          name: 'home',
          component: () => import('../pages/MovieView.vue'),
        },
      ],
    },
  ],
});

export default router;
