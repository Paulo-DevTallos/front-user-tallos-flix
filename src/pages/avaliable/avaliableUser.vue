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
							<b-card-img
								onerror="this.onerror=null;this.src='/img/empty-img.png';"
								:src="
									avaliable.data.result.poster
										? avaliable.data.result.poster
										: '/img/empty-img.png'
								"
							></b-card-img>
						</b-col>
						<b-col>
							<h5>{{ avaliable.data.result.title }}</h5>
							<h6>Sua avaliação</h6>
							<div
								v-for="rate in this.$store.state.Ratings.RatingsUser"
								:key="rate"
							>
								<options-modal
									@closeWindow="hiddenModal"
									@redirect="removeAvaliable(rate)"
									:hiddenBtnRemoveFav="true"
									v-if="showModal"
									:action="`Deseja realmente remover sua avaliação?`"
								/>
								<star-rating
									v-if="rate.movie === avaliable.data.result._id"
									class="d-flex"
									v-model="rate.myRate.rate"
								/>
								<h6
									class="btnRemove"
									v-if="rate.movie === avaliable.data.result._id"
									@click="hiddenModal(rate)"
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
import OptionsModal from '@/components/Modals/OptionsModal.vue';

export default defineComponent({
	components: { HeaderApp, StarRating, OptionsModal },
	data() {
		return {
			MyRate: '',
			showModal: false,
			moviesAvaliable: [],
			userRatings: [],
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
					console.log(result);
					this.moviesAvaliable.push(result);
				});
			}
			console.log(this.moviesAvaliable);
		},
		async removeAvaliable(rate: any) {
			rate = this.MyRate;
			(this.delete.rate = rate.myRate.rate),
				(this.delete.user_id = rate.myRate.user_id),
				await this.$store.dispatch('Ratings/removeRating', {
					id: rate.movie,
					delRate: this.delete,
				});
			(this.moviesAvaliable = []), await this.renderAvaliable();
			this.hiddenModal();
		},
		hiddenModal(rate?: any) {
			this.showModal = !this.showModal;
			this.MyRate = rate;
		},
	},
	mounted() {
		this.renderAvaliable();
	},
});
</script>
