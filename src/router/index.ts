import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/defaultLayout',
      name: 'defaultLayout',
      component: () => import('../layouts/DefaultLayout.vue'),
      children: [
        {
          path: 'teste',
          name: 'teste',
          component: () => import('../components/teste.vue'),
        }
      ]
    },
  ],
});

export default router;
