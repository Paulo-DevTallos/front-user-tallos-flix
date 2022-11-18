<template>
	<b-row cols="1" cols-sm="2" cols-md="2" cols-lg="2">
		<b-col
			v-for="movie in moviesRender"
			:key="movie._id"
			col
			no-gutters
			class="mt-5"
		>
			<b-card no-body>
				<b-row class="d-flex">
					<div class="card-info-img">
						<router-link :to="{ path: `/home/${resource}/${movie._id}` }">
							<b-card-img
								:src="movie.poster || vazio.poster"
								v-if="movie.poster ? movie.poster : vazio.poster"
								onerror="this.onerror=null;this.src='/img/empty-img.png';"
								class="rounded-0"
								@click="$emit('redirectTo', movie)"
							></b-card-img>
						</router-link>
					</div>
					<div class="card-info">
						<b-card-body
							class="d-flex flex-column-reverse h-100 pb-0 card-body"
						>
							<div>
								<b-card-title v-if="movie.title ? movie.title : vazio.title">{{
									movie.title || vazio.title
								}}</b-card-title>
								<b-card-subtitle v-if="movie.runtime"
									>Duração:
									{{
										Math.trunc(movie.runtime / 60) +
										'h' +
										(movie.runtime % 60) +
										'min'
									}}</b-card-subtitle
								>
								<div class="d-flex">
									<star-rating
										:ratingRawValue="movie.imdb.rating"
										class="rating"
									/>
								</div>
								<router-link :to="{ path: `/home/${resource}/${movie._id}` }">
									<ButtonDefault
										@btnAction="$emit('redirectTo', movie)"
										:data_btn_title="btn_name"
									/>
								</router-link>
							</div>
						</b-card-body>
					</div>
				</b-row>
			</b-card>
		</b-col>
	</b-row>
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
