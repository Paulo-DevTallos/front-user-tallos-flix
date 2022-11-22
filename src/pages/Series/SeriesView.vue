<template>
	<div
		class="home-field d-flex justify-content-center align-items-center flex-column gap-5"
	>
		<div class="d-flex justify-content-center search-components">
			<FilterButton :FilterSeries="true" />
			<SearchBar @search="searchMovie" :Series="true" />
		</div>
		<div
			class="home-carousel d-flex flex-column p-2 pb-3 mb-3"
			v-if="hiddenCarousel"
		>
			<div
				class="d-flex ms-5 mb-3 gap-2 align-items-center"
				v-if="$store.state.Movies.IsSeriesGenre == true"
			>
				<span id="genre-title">Gênero: </span>
				<span id="tagGenre">{{ $store.state.Movies.actualTag }}</span>
			</div>
			<div class="home-carousel">
				<SlideCarousel
					:IsRendered="render"
					:hiddenMovieInfo="true"
					:RenderSeries="true"
				/>
			</div>
		</div>
		<ErrorComponent :data_word="movies_name" v-if="hiddenErrorSearch" />
		<div v-if="isMoviesRenderVisible">
			<CardsMovies
				:moviesRender="$store.state.Movies.Movies.content"
				:resource="'serie'"
				:btn_name="'Ver Serie'"
			/>
			<PaginationPage
				class="paginationTT"
				v-model="page"
				:per-page="limit"
				:rows="rows"
				@click="handlePageChange"
			/>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SearchBar from '@/components/SearchBar/SearchBar.vue';
import SlideCarousel from '@/components/Caroussel.vue';
import FilterButton from '@/components/FilterButton.vue';
import ErrorComponent from '@/components/ErrorComponent.vue';
import { mapGetters } from 'vuex';

export default defineComponent({
	name: 'SeriesView',
	components: { SearchBar, SlideCarousel, FilterButton, ErrorComponent },
	data() {
		return {
			isChanged: '',
			movies_name: '',
			hiddenCarousel: true,
			hiddenErrorSearch: false,
			render: false,
			isMoviesRenderVisible: false,
			page: 1,
			limit: 8,
		};
	},

	methods: {
		searchMovie(data: string) {
			if (data !== this.isChanged) {
				this.isChanged = data;
				setTimeout(() => {
					this.movies_name = data;
					if (this.isChanged === data) {
						this.$store.dispatch('Movies/getSeries', {
							field: 'title',
							search: data,
						});
					}
				}, 1000);
			}
		},
		reloadRequest() {
			try {
				this.$store.dispatch('Movies/getSeries', {
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
	watch: {
		['Movies/getErrorPage'](data) {
			if (data === true) {
				this.hiddenErrorSearch = true;
				this.hiddenCarousel = false;
				this.render = false;
			} else {
				this.hiddenErrorSearch = false;
				this.hiddenCarousel = true;
				this.render = true;
			}
		},
	},
	computed: {
		...mapGetters(['Movies/getErrorPage']),
		rows() {
			return this.$store.state.Movies.Movies.numberOfElements;
		},
	},
	mounted() {
		this.$store.state.Movies.IsMovieGenre = false;
		this.$store.dispatch(
			'Favorites/getFavoriteById',
			this.$store.state.Users.UserId,
		);
	},
});
</script>
