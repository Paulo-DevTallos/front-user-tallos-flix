<template>
	<div
		class="home-field d-flex justify-content-center align-items-center flex-column gap-5"
	>
		<div class="d-flex justify-content-center search-components">
			<FilterButton :FilterSeries="false" />
			<SearchBar @search="searchMovie" />
		</div>
		<div class="home-carousel d-flex flex-column p-2 pb-3 mb-3">
			<div
				class="d-flex ms-5 mb-3 gap-2 align-items-center"
				v-if="$store.state.Movies.IsMovieGenre == true"
			>
				<span id="genre-title">Gênero: </span>
				<span id="tagGenre">{{ $store.state.Movies.actualTag }}</span>
			</div>
			<div class="home-carousel" v-if="hiddenCarousel">
				<SlideCarousel
					:resource="'movie'"
					:query_param="''"
					:hiddenMovieInfo="true"
				/>
			</div>
		</div>
		<div>
			<p v-if="movies_name.length > 5">
				Filmes com a palavra {{ movies_name }}
			</p>
			<ErrorComponent
				:error_value="'Não encontramos filmes com a palavra'"
				:data_word="movies_name"
				v-if="hiddenErrorSearch"
			/>
			<div v-if="isMoviesRenderVisible">
				<CardsMovies
					:moviesRender="$store.state.Movies.Movies.content"
					:resource="'movie'"
					:btn_name="'Ver Filme'"
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
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import SearchBar from '@/components/SearchBar/SearchBar.vue';
import FilterButton from '@/components/FilterButton.vue';
import ErrorComponent from '@/components/ErrorComponent.vue';
import SlideCarousel from '@/components/Carousel/SlideCarousel.vue';
import CardsMovies from '@/components/Cards/CardsMovies.vue';
import PaginationPage from '@/components/Pagination/PaginationPage.vue';

export default defineComponent({
	name: 'MoviesView',
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
			movies_name: '',
			isChanged: '',
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
						this.SearchData = data;
						this.$store.dispatch('Movies/getMovieFilter', {
							field: 'title',
							search: data,
						});
					}
				}, 300);
				if (data.length !== 0) this.isMoviesRenderVisible = true;
				else return (this.isMoviesRenderVisible = false);
			}
		},
		reloadRequest() {
			try {
				this.$store.dispatch('Movies/getMovieFilter', {
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
			return this.$store.state.Movies.Movies.numberOfElements;
		},
	},
	mounted() {
		// this.reloadRequest();
		this.$store.state.Movies.IsSeriesGenre = false;

		if (this.$store.state.Movies.dontRender === true) {
			this.$store.dispatch('Movies/getMovieFilter', {
				field: 'title',
				search: this.$store.state.Movies.searchData,
			});
			this.SearchData = this.$store.state.Movies.searchData;
			this.$store.state.Movies.dontRender = false;
			this.isMoviesRenderVisible = true;
		} else {
			this.$store.dispatch(
				'Favorites/getFavoriteById',
				this.$store.state.Users.UserId,
			);
			this.isMoviesRenderVisible = false;
		}
	},
});
</script>
