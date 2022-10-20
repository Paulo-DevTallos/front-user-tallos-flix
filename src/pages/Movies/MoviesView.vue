<template>
  <div
    class="home-field d-flex justify-content-center align-items-center flex-column gap-5"
  >
    <div class="search-components d-flex flex-column gap-5 ">
      <SearchBar />
      <Carousel />
    </div>
  </div>
</template>

<script lang="ts">
import SearchBar from "../../components/SearchBar.vue";
import Carousel from '@/components/Carousel.vue'
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MoviesView',
  components: { SearchBar, Carousel },
});
</script>

<style lang="sass" scoped></style>
