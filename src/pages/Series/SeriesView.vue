<template>
  <div
    class="home-field d-flex justify-content-center align-items-center flex-column gap-5"
  >
    <div class="d-flex justify-content-center search-components">
      <FilterButton />
      <SearchBar :Series="true" />
    </div>
    <div class="home-carousel d-flex flex-column p-2 pb-3 mb-3">
      <Carousel :hiddenMovieInfo="true" :RenderSeries="true" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SearchBar from '@/components/SearchBar.vue';
import Carousel from '@/components/Carousel.vue';
import FilterButton from '@/components/FilterButton.vue';

export default defineComponent({
  name: 'SeriesView',
  components: { SearchBar, Carousel, FilterButton },
});
</script>

<style lang="sass" scoped></style>
