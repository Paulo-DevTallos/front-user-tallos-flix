<template>
	<div class="gap-5">
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
			<div class="home-carousel" v-if="hiddenCarousel">
				<SlideCarousel
					:IsRendered="render"
					:hiddenMovieInfo="true"
					:RenderSeries="true"
				/>
			</div>
		</div>
		<section>
			<p class="search-filter" v-if="movies_name.length > 3">
				Series com a palavra {{ movies_name }}
			</p>
			<ErrorComponent
				:error_value="'Não encontramos filmes com a palavra'"
				:data_word="movies_name"
				v-if="hiddenErrorSearch"
			/>
			<div v-if="isMoviesRenderVisible">
				<div class="container-search">
					<CardsMovies
						:moviesRender="$store.state.Movies.Series.content"
						:resource="'serie'"
						:btn_name="'Ver Série'"
						@redirectTo="currentSerie"
					/>
				</div>
				<div class="pagination-footer">
					<PaginationPage
						class="paginationTT"
						v-model="page"
						:per-page="limit"
						:rows="rows"
						@click="handlePageChange"
					/>
				</div>
			</div>
		</section>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SearchBar from '@/components/SearchBar/SearchBar.vue';
import SlideCarousel from '@/components/Caroussel.vue';
import FilterButton from '@/components/FilterButton.vue';
import ErrorComponent from '@/components/ErrorComponent.vue';
import CardsMovies from '@/components/Cards/CardsMovies.vue';
import PaginationPage from '@/components/Pagination/PaginationPage.vue';
import { mapGetters } from 'vuex';

export default defineComponent({
	name: 'SeriesView',
	components: {
		SearchBar,
		SlideCarousel,
		FilterButton,
		ErrorComponent,
		CardsMovies,
		PaginationPage,
	},
	data() {
		return {
			SearchData: '',
			isChanged: '',
			movies_name: '',
			hiddenErrorSearch: false,
			hiddenCarousel: true,
			render: false,
			isMoviesRenderVisible: false,
			page: 1,
			limit: 8,
		};
	},

	methods: {
		currentSerie(serie: object) {
			this.$store.state.Movies.currentMovie = serie;
		},
		searchMovie(data: string) {
			if (data !== this.isChanged) {
				this.isChanged = data;
				setTimeout(() => {
					this.movies_name = data;
					if (this.isChanged === data) {
						this.SearchData = data;
						this.$store.dispatch('Movies/getSeries', {
							field: 'title',
							search: data,
						});
					}
				}, 1000);
				if (data.length !== 0) this.isMoviesRenderVisible = true;
				else return (this.isMoviesRenderVisible = false);
			}
		},
		reloadRequest() {
			try {
				this.$store.dispatch('Movies/getSeries', {
					field: 'title',
					search: this.SearchData,
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
			return this.$store.state.Movies.Series.numberOfElements;
		},
	},
	mounted() {
		this.$store.state.Movies.IsSeriesGenre = false;
		this.$store.dispatch(
			'Favorites/getFavoriteById',
			this.$store.state.Users.UserId,
		);
	},
});
</script>
