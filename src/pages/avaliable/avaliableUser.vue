<template>
	<div class="container-fv">
		<header-app />
		<b-container class="pt-5 favorite-container">
			<div class="pb-2">
				<h3 class="title">Minhas Avaliações</h3>
			</div>
			<b-row col no-gutters>
				<b-col
					cols="6"
					class="Colprin pb-5"
					v-for="avaliable in moviesAvaliable"
					:key="avaliable"
				>
					<b-row>
						<b-col cols="6">
							<b-card-img :src="avaliable.data.result.poster"></b-card-img>
						</b-col>
						<b-col>
							<h5>{{ avaliable.data.result.title }}</h5>
							<h6>Sua avaliação</h6>
							<star-rating class="d-flex" />
							<h6 class="btnRemove">Remover a avaliação</h6>
						</b-col>
					</b-row>
				</b-col>
			</b-row>
		</b-container>
	</div>
</template>
<script lang="ts">
import HeaderApp from '@/components/Header/HeaderApp.vue';
import { defineComponent } from 'vue';
import ServiceGetRatingMovie from '@/services/axios/MovieRequests';
import StarRating from '@/components/Rating/StarRating.vue';

export default defineComponent({
	components: { HeaderApp, StarRating },
	data() {
		return {
			moviesAvaliable: [],
		};
	},
	mounted() {
		console.log(this.$store.state.Ratings.RatingsUser);
		this.$store.dispatch(
			'Ratings/getAllRatingsUser',
			this.$store.state.Users.UserId,
		);
		for (
			let index = 0;
			index < this.$store.state.Ratings.RatingsUser.length;
			index++
		) {
			ServiceGetRatingMovie.getMovieFilterId(
				this.$store.state.Ratings.RatingsUser[index].movie_id,
			)
				.then((result) => {
					this.moviesAvaliable.push(result);
				})
				.catch((err) => {});
			// this.$store.dispatch(
			//   'Movies/getMovieFilterId',
			//   this.$store.state.Ratings.RatingsUser[index].movie_id,
			// );
			// console.log(this.$store.state.Movies.Movies);
		}
		console.log(this.moviesAvaliable);
	},
});
</script>
