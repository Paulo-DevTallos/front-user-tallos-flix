<template>
	<div
		class="home-field d-flex justify-content-center align-items-center flex-column gap-5"
	>
		<div class="d-flex justify-content-center search-components">
			<FilterButton :FilterSeries="true" />
			<SearchBar @search="searchSerie" :Series="true" />
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
			<div>
				<h4 class="title-search-h4" v-if="serie_name.length > 3">
					Filmes com a palavra {{ serie_name }}
				</h4>
			</div>
		</div>
		<ErrorComponent
			:error_value="'Não encontramos series com a palavra'"
			:data_word="serie_name"
			v-if="hiddenErrorSearch"
		/>
		<div>
			<CardsMovies
				:moviesRender="$store.state.Movies.Series.content"
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
import { mapGetters } from 'vuex';
import SearchBar from '@/components/SearchBar/SearchBar.vue';
import FilterButton from '@/components/FilterButton.vue';
import ErrorComponent from '@/components/ErrorComponent.vue';
import CardsMovies from '@/components/Cards/CardsMovies.vue';

export default defineComponent({
	name: 'SeriesView',
	components: { SearchBar, FilterButton, ErrorComponent, CardsMovies },
	data() {
		return {
			searchDataSearie: '',
			isChanged: '',
			serie_name: '',
			hiddenCarousel: true,
			hiddenErrorSearch: false,
			page: 1,
			limit: 8,
		};
	},

	methods: {
		searchSerie(data: string) {
			if (data !== this.isChanged) {
				this.isChanged = data;
				setTimeout(() => {
					this.serie_name = data;
					if (this.isChanged === data) {
						this.searchDataSearie = data;
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
					field: 'title',
					search: this.searchSerie,
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
			} else {
				this.hiddenErrorSearch = false;
				this.hiddenCarousel = true;
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
		this.$store.state.Movies.IsMovieGenre = false;
		this.$store.dispatch(
			'Favorites/getFavoriteById',
			this.$store.state.Users.UserId,
		);
	},
});
</script>
