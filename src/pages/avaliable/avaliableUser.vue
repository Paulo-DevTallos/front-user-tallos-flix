<template>
	<div class="container-fv">
		<header-app />
		<b-container class="pt-5 favorite-container">
			<div class="pb-2">
				<h3 class="title">Minhas Avaliações</h3>
				<div class="description" v-if="moviesAvaliable.length === 0">
					<p>Parece que você ainda não tem filmes ou séries Avaliados</p>
				</div>
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
							<div
								v-for="rate in this.$store.state.Ratings.RatingsUser"
								:key="rate"
							>
								<star-rating
									v-if="rate.movie === avaliable.data.result._id"
									class="d-flex"
									v-model="rate.myRate.rate"
								/>
								<h6
									class="btnRemove"
									v-if="rate.movie === avaliable.data.result._id"
									@click="removeAvaliable(rate)"
								>
									Remover a avaliação
								</h6>
							</div>
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
			moviesAvaliable: {},
			delete: {
				rate: 0,
				user_id: '',
			},
		};
	},
	methods: {
		async renderAvaliable() {
			console.log(this.$store.state.Ratings.RatingsUser);
			await this.$store.dispatch(
				'Ratings/getAllRatingsUser',
				this.$store.state.Users.UserId,
			);
			for (
				let index = 0;
				index < this.$store.state.Ratings.RatingsUser.length;
				index++
			) {
				await ServiceGetRatingMovie.getMovieFilterId(
					this.$store.state.Ratings.RatingsUser[index].movie,
				).then((result) => {
					this.moviesAvaliable = result;
				});
			}
			console.log(this.moviesAvaliable);
		},
		async removeAvaliable(rate) {
			(this.delete.rate = rate.myRate.rate),
				(this.delete.user_id = rate.myRate.user_id),
				await this.$store.dispatch('Ratings/removeRating', {
					id: rate.movie,
					delRate: this.delete,
				});
			await this.renderAvaliable();
		},
	},
	mounted() {
		this.renderAvaliable();
	},
});
</script>
