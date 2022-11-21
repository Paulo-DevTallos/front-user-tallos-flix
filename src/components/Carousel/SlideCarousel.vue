<template>
	<div class="container-full">
		<h4>{{ title_carousel }}</h4>
		<button @click="prev" class="arrow-left">
			<Icon icon="carbon:chevron-left" />
		</button>
		<button @click="next" class="arrow-right">
			<Icon icon="carbon:chevron-right" />
		</button>
		<div class="carousel-container">
			<div
				v-for="movie in RenderSeries
					? $store.state.Movies.Movies.content
					: $store.state.Movies.Series.content"
				:key="movie._id"
				class="gallery-wrapper"
			>
				<div class="gallery-movies">
					<router-link :to="{ path: `/home/${resource}${query_param}` }">
						<img
							class="item-image-poster"
							v-if="movie.poster ? movie.poster : empty.poster"
							:src="movie.poster || empty.poster"
							alt="movie.title"
							@click="currentMovie(movie)"
						/>
					</router-link>
				</div>
				<div class="card-info-movies" v-if="hiddenMovieInfo">
					<h4
						v-if="
							movie.title.length > 16
								? (substring = `${movie.title.substring(0, 16)}...`)
								: (substring = `${movie.title.substring(0, 16)} `)
						"
					>
						{{ substring }}
					</h4>
					<p v-if="movie.runtime">
						Duração:
						{{
							Math.trunc(movie.runtime / 60) +
							'h' +
							(movie.runtime % 60) +
							'min'
						}}
					</p>
					<StarRating class="rating" :ratingRawValue="movie.imdb.rating" />
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Icon } from '@iconify/vue';
import StarRating from '../Rating/StarRating.vue';

export default defineComponent({
	name: 'SlideCarousel',
	components: { Icon, StarRating },
	props: {
		title_carousel: {
			type: String,
		},
		hiddenMovieInfo: {
			type: Boolean,
		},
		RenderSeries: {
			type: Boolean,
		},
		People: {
			type: Boolean,
		},
		IsRendered: {
			type: Boolean,
		},
		resource: {
			type: String,
		},
		query_param: {
			type: String,
		},
	},
	data() {
		return {
			movies: [],
			empty: {
				poster: '/img/empty-img.png',
			},
			substring: '',
		};
	},

	methods: {
		next() {
			const items = document.querySelectorAll('.item-image-poster');
			let currentItem = 0;
			const maxItems = items.length;

			currentItem--;

			if (currentItem >= maxItems) {
				currentItem = 0;
			}

			if (currentItem < 0) {
				currentItem = maxItems - 1;
			}

			items[currentItem].scrollIntoView({
				behavior: 'smooth',
				block: 'nearest',
			});
		},

		prev() {
			const items = document.querySelectorAll('.item-image-poster');
			let currentItem = 0;
			const maxItems = items.length;

			currentItem++;

			if (currentItem <= maxItems) {
				currentItem = 0;
			}

			if (currentItem > 0) {
				currentItem = maxItems + 1;
			}

			items[currentItem].scrollIntoView({
				behavior: 'smooth',
				block: 'nearest',
			});
		},
		currentMovie(movie: object) {
			this.$store.state.Movies.currentMovie = movie;
		},
	},

	async mounted() {
		if (this.People === false && this.IsRendered === false) {
			if (this.$store.state.Movies.IsMovieGenre == false) {
				if (this.RenderSeries === true) {
					await this.$store.dispatch('Movies/getSeries');
				} else {
					await this.$store.dispatch('Movies/getMovieFilter');
				}
			} else {
				this.$store.state.Movies.IsMovieGenre == true;
			}
		}
	},
});
</script>
