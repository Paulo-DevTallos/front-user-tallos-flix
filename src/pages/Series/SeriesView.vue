<template>
  <div
    class="home-field d-flex justify-content-center align-items-center flex-column gap-5"
  >
    <div class="d-flex justify-content-center search-components">
      <FilterButton />
      <SearchBar @search="searchMovie" :Series="true" />
    </div>
    <div
      class="home-carousel d-flex flex-column p-2 pb-3 mb-3"
      v-if="hiddenCarousel"
    >
      <Carousel :hiddenMovieInfo="true" :RenderSeries="true" />
    </div>
    <ErrorComponent :data_word="movies_name" v-if="hiddenErrorSearch" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SearchBar from '@/components/SearchBar.vue';
import Carousel from '@/components/Carousel.vue';
import FilterButton from '@/components/FilterButton.vue';
import ErrorComponent from '@/components/ErrorComponent.vue';
import { mapGetters } from 'vuex';

export default defineComponent({
  name: 'SeriesView',
  components: { SearchBar, Carousel, FilterButton, ErrorComponent },
  data() {
    return {
      isChanged: '',
      movies_name: '',
      hiddenCarousel: true,
      hiddenErrorSearch: false,
    }
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
  },
  watch: {
    ['Movies/getErrorPage'](data) {
      console.log(data);
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
  },
  mounted() {
    this.$store.dispatch(
      'Favorites/getFavoriteById',
      this.$store.state.Users.UserId,
    );
  },
});
</script>

<style lang="sass" scoped></style>
