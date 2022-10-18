<template>
  <div
    class="home-field d-flex justify-content-center align-items-center flex-column gap-5"
  >
    <h1>Olá, Sobre qual filme quer conhecer hoje ?</h1>
    <SearchBar />
    <div class="home-carousel d-flex flex-column p-2 pb-3 mb-3">
      <h4>Nos Cinemas</h4>
      <Carousel />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import SearchBar from '@/components/SearchBar.vue';
import Carousel from '@/components/Carousel.vue';
export default defineComponent({
  name: 'MovieView',
  components: {
    SearchBar,
    Carousel,
  },
});
</script>
<style lang="scss" scoped></style>
