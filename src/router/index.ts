import {
	createRouter,
	createWebHistory,
	type NavigationGuardNext,
	type RouteLocation,
} from 'vue-router';

const authGuard =
	() => (to: RouteLocation, from: RouteLocation, next: NavigationGuardNext) => {
		if (localStorage.getItem('token') || '') {
			next();
		} else {
			next('/');
		}
	};

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
			beforeEnter: authGuard(),
			component: () => import('../pages/Favorites/MyFavorites.vue'),
		},
		{
			path: '/home/avaliable',
			name: 'avaliable',
			beforeEnter: authGuard(),
			component: () => import('../pages/avaliable/avaliableUser.vue'),
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
					path: 'movie/:id?',
					name: 'movie',
					component: () => import('../pages/Movies/MovieView.vue'),
				},
				{
					path: 'movies',
					name: 'movies',
					component: () => import('../pages/Movies/MoviesView.vue'),
				},
				{
					path: 'serie/:id?',
					name: 'serie',
					component: () => import('../pages/Series/SerieView.vue'),
				},
				{
					path: 'series',
					name: 'series',
					component: () => import('../pages/Series/SeriesView.vue'),
				},
				{
					path: 'movieLocation/:id',
					name: 'movieLocation',
					component: () => import('../pages/Theaters/MovieLocation.vue'),
				},
				{
					path: 'Peoples/:name',
					name: 'DirectorPage',
					component: () => import('../pages/Peoples/PeopleView.vue'),
				},
			],
		},
		{
			path: '/:pathMatch(.*)*',
			name: 'not-found',
			component: () => import('@/pages/NotFound/NotFoundView.vue'),
		},
	],
});

export default router;
