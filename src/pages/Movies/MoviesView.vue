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
        <SlideCarousel :hiddenMovieInfo="true" />
      </div>
      <!--<Carousel
				v-if="hiddenCarousel"
				:IsRendered="render"
				:hiddenMovieInfo="true"
			/>-->
    </div>
    <div>
			<p v-if="movies_name.length > 5">Filmes com a palavra {{ movies_name }}</p>
			<ErrorComponent :data_word="movies_name" v-if="hiddenErrorSearch" />
      <CardsMovies
				v-if="isMoviesRenderVisible"
				:moviesRender="$store.state.Movies.Movies.content"/>
    </div>
  </div>
</template>

<script lang="ts"> 
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import SearchBar from '@/components/SearchBar.vue';
import FilterButton from '@/components/FilterButton.vue';
import ErrorComponent from '@/components/ErrorComponent.vue';
import SlideCarousel from '@/components/Carousel/SlideCarousel.vue';
import CardsMovies from '@/components/Cards/CardsMovies.vue';

export default defineComponent({
  name: 'MoviesView',
  components: {
    SearchBar,
    SlideCarousel,
    FilterButton,
    ErrorComponent,
    CardsMovies,
  },
  data() {
    return {
      movies_name: '',
      isChanged: '',
      hiddenCarousel: true,
      hiddenErrorSearch: false,
      render: false,
			isMoviesRenderVisible: false,
    };
  },
  methods: {
    searchMovie(data: string) {
      if (data !== this.isChanged) {
        this.isChanged = data;
        setTimeout(() => {
          this.movies_name = data;
          if (this.isChanged === data) {
            this.$store.dispatch('Movies/getMovieFilter', {
              field: 'title',
              search: data,
            });
          }
        }, 1000);
				if (data.length !== 0 ) this.isMoviesRenderVisible = true;
				else return this.isMoviesRenderVisible = false;
      }

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

<style lang="sass" scoped></style>
