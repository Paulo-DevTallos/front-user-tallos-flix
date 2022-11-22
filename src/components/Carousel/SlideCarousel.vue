<template>
	<div class="container-full">
		<h4>{{ title_carousel }}</h4>
		<carousel
			:items-to-show="4"
			:items-to-scroll="1"
			:wrapAround="false"
			snapAlign="start"
		>
			<slide
				v-for="movie in RenderSeries === false
					? $store.state.Movies.Movies.content
					: $store.state.Movies.Series.content"
				:key="movie.id"
				class="carousel__slide"
			>
				<div>
					<div class="carousel-card">
						<div class="image-container">
							<router-link
								:to="{ path: `/home/movie` }"
								v-if="RenderSeries == false"
							>
								<img
									v-if="movie.poster ? movie.poster : empty.poster"
									:src="movie.poster || empty.poster"
									:alt="movie.title"
									onerror="this.onerror=null;this.src='/img/empty-img.png';"
									@click="currentMovie(movie)"
								/>
							</router-link>
							<router-link :to="{ path: `/home/serie` }" v-else>
								<img
									v-if="movie.poster ? movie.poster : empty.poster"
									:src="movie.poster || empty.poster"
									:alt="movie.title"
									onerror="this.onerror=null;this.src='/img/empty-img.png';"
									@click="currentMovie(movie)"
								/>
							</router-link>
						</div>
					</div>
					<div class="info-movies" v-if="hiddenMovieInfo">
						<h3
							v-if="
								movie.title.length > 16
									? (substring = `${movie.title.substring(0, 16)}...`)
									: (substring = `${movie.title.substring(0, 16)} `)
							"
						>
							{{ substring }}
						</h3>
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
			</slide>
			<template #addons>
				<navigation>
					<template #next>
						<span class="icon-style position-rigth">
							<Icon icon="carbon:chevron-right" />
						</span>
					</template>
					<template #prev>
						<span class="icon-style position-left">
							<Icon icon="carbon:chevron-left" />
						</span>
					</template>
				</navigation>
			</template>
		</carousel>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Navigation } from 'vue3-carousel';
import StarRating from '../Rating/StarRating.vue';
import { Icon } from '@iconify/vue';
export default defineComponent({
	name: 'carousel-slide',
	components: {
		Carousel,
		Slide,
		Navigation,
		StarRating,
		Icon,
	},
	props: {
		hiddenMovieInfo: { type: Boolean },
		RenderSeries: { type: Boolean },
		People: { type: Boolean },
		IsRendered: { type: Boolean },
		title_carousel: { type: String },
	},
	data() {
		return {
			image_path: import.meta.env.VITE_APP_URL + 'img/',
			movies: [],
			empty: {
				poster: '/img/empty-img.png',
			},
			substring: '',
		};
	},
	methods: {
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

<style lang="scss" scoped></style>

<!--<template>
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
			const renderGenres = this.$store.state.Movies.IsMovieGenre;

			if (!renderGenres && !this.RenderSeries) {
				await this.$store.dispatch('Movies/getMovieFilter');
			} else {
				await this.$store.dispatch('Movies/getSeries');
			}
		}
	},
});
</script>-->
