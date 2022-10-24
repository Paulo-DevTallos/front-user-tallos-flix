<template>
  <div
    class="home-field d-flex justify-content-center align-items-center flex-column gap-5"
  >
    <div class="search-components d-flex flex-column gap-5">
      <div class="d-flex justify-content-center">
        <div class="me-5 box-filter-container">
          <button
            class="search-input wd-btn text-input styles-filter"
            @click="callBoxFilter"
          >
            Filtrar...
            <Icon icon="dashicons:arrow-down-alt2" />
          </button>
          <div class="box-filter-bar" v-if="hiddenBoxFilter">
            <ul>
              <li>A-Z</li>
              <li>Gênero</li>
              <li>Ano</li>
            </ul>
          </div>
        </div>
        <SearchBar />
      </div>
      <div class="home-carousel d-flex flex-column p-2 pb-3 mb-3">
        <Carousel :hiddenMovieInfo="true" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Icon } from '@iconify/vue';
import SearchBar from '@/components/SearchBar.vue';
import Carousel from '@/components/Carousel.vue';

export default defineComponent({
  name: 'MoviesView',
  components: { SearchBar, Carousel, Icon },
  data() {
    return {
      hiddenBoxFilter: false,
    };
  },

  methods: {
    callBoxFilter(): void {
      this.hiddenBoxFilter = !this.hiddenBoxFilter;
    },
  },
});
</script>

<style lang="sass" scoped></style>
