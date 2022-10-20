<template>
  <div
    class="home-field d-flex justify-content-center align-items-center flex-column gap-5"
  >
    <div class="search-components d-flex flex-column gap-5 ">
      <div class="d-flex justify-content-center">
        <div class="me-5">
          <button class="search-input wd-btn text-input styles-filter">
            Filtrar...
            <Icon icon="dashicons:arrow-down-alt2" />
          </button>
        </div>
        <SearchBar />
      </div>
      <Carousel />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Icon } from '@iconify/vue';
import SearchBar from "../../components/SearchBar.vue";
import Carousel from '@/components/Carousel.vue'

export default defineComponent({
  name: 'MoviesView',
  components: { SearchBar, Carousel, Icon },
});
</script>

<style lang="sass" scoped></style>
