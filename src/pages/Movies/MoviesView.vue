<template>
  <div
    class="home-field d-flex justify-content-center align-items-center flex-column gap-5"
  >
    <div class="d-flex justify-content-center search-components">
      <FilterButton />
      <SearchBar />
    </div>
    <div class="home-carousel d-flex flex-column p-2 pb-3 mb-3">
      <div
        class="d-flex ms-5 mb-3 gap-2 align-items-center"
        v-if="this.$store.state.Movies.IsMovieGenre == true"
      >
        <span id="genre-title">Gênero: </span>
        <span id="tagGenre">{{ this.$store.state.Movies.actualTag }}</span>
      </div>
      <Carousel :hiddenMovieInfo="true" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SearchBar from '@/components/SearchBar.vue';
import Carousel from '@/components/Carousel.vue';
import FilterButton from '@/components/FilterButton.vue';

export default defineComponent({
  name: 'MoviesView',
  components: { SearchBar, Carousel, FilterButton },
  mounted() {
    console.log(this.$store.state.Movies.IsMovieGenre);
  },
});
</script>

<style lang="sass" scoped></style>
