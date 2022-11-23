<template>
	<div
		class="card-cine-container"
		v-for="movie in moviesRender"
		:key="movie._id"
	>
		<div class="card-cine-content">
			<div class="card-info-img">
				<router-link :to="{ path: `/home/${resource}` }">
					<img
						:src="movie.poster || vazio.poster"
						v-if="movie.poster ? movie.poster : vazio.poster"
						onerror="this.onerror=null;this.src='/img/empty-img.png';"
						@click="$emit('redirectTo', movie)"
					/>
				</router-link>
			</div>
			<div class="card-info">
				<div>
					<h3 v-if="movie.title ? movie.title : vazio.title">
						{{ movie.title || vazio.title }}
					</h3>
					<div v-if="movie.runtime">
						Duração:
						{{
							Math.trunc(movie.runtime / 60) +
							'h' +
							(movie.runtime % 60) +
							'min'
						}}
					</div>
					<star-rating :ratingRawValue="movie.imdb.rating" class="rating" />
				</div>
				<router-link :to="{ path: `/home/${resource}` }">
					<ButtonDefault
						class="btn-responsive"
						@btnAction="$emit('redirectTo', movie)"
						:data_btn_title="btn_name"
					/>
				</router-link>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import StarRating from '../Rating/StarRating.vue';
import ButtonDefault from '../Buttons/ButtonDefault.vue';

export default defineComponent({
	name: 'CardsMovies',
	emits: ['redirectTo'],
	props: {
		moviesRender: {
			type: Function,
		},
		btn_name: {
			type: String,
		},
		resource: {
			type: String,
		},
	},
	components: {
		StarRating,
		ButtonDefault,
	},
	data() {
		return {
			vazio: {
				poster: '/img/empty-img.png',
				title: 'Filme sem titulo',
			},
		};
	},
});
</script>
