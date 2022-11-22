<template>
	<main>
		<cards-movies
			@redirectTo="currentMovie"
			:btn_name="'Nos Cinemas'"
			:moviesRender="$store.state.Movies.Movies.content"
			:resource="'movieLocation'"
			:query_param="''"
		/>
	</main>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import CardsMovies from '@/components/Cards/CardsMovies.vue';

export default defineComponent({
	components: {
		CardsMovies,
	},
	data() {
		return {
			page: 1,
			limit: 8,
		};
	},
	computed: {
		rows() {
			return this.$store.state.Movies.Movies.numberOfElements;
		},
	},
	methods: {
		currentMovie(movie: object) {
			this.$store.state.Movies.currentMovie = movie;
		},

		reloadRequest() {
			try {
				this.$store.dispatch('Movies/getMovieFilter', {
					page: this.page,
					limit: this.limit,
					sortValue: -1,
				});
			} catch (error) {
				return [];
			}
		},
		handlePageChange() {
			this.page + 1;
			this.reloadRequest();
		},
	},
	mounted() {
		this.reloadRequest();
		this.$store.state.Movies.IsMovieGenre = false;
		this.$store.state.Movies.IsSeriesGenre = false;
		this.$store.dispatch(
			'Favorites/getFavoriteById',
			this.$store.state.Users.UserId,
		);
	},
});
</script>

<style lang="scss" scoped>
	main {
		padding: 70px 50px 100px;
		min-height: 100vh;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;

		@media(max-width: 1235px) {
			padding: 70px 100px 100px;
		} 
		@media(max-width: 1005px) {
			padding: 70px 60px 100px;
		} 
		@media(max-width: 865px) {
			padding: 70px 40px 100px;
		} 
		@media(max-width: 800px) {
			padding: 70px 20px 100px;
		} 
		@media(max-width: 610px) {
			flex-direction: column;
		} 
		@media(max-width: 480px) {
			padding: 70px 0 100px;
		} 
	}
</style>
