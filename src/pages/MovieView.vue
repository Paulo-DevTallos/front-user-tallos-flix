<template>
  <div
    class="
      home-field
      d-flex
      justify-content-center
      align-items-center
      flex-column
      mt-5
      gap-5
    "
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
  name: 'home',
  components: {
    SearchBar,
    Carousel,
  },
});
</script>
<style lang="scss" scoped>
@import url(https://fonts.googleapis.com/css2?family=Nunito:wght@100;200;300;400;500;600;800;900&display=swap);
@import url(https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;800;900&display=swap);
.home-field {
  h1 {
    font-family: 'Nunito', sans-serif;
    margin-top: 30%;
    color: white;
    text-align: center;
    font-weight: bold;
  }
  .home-carousel {
    width: 70%;
    background-color: #302f2f;

    h4 {
      color: white;
      width: 90%;
      align-self: flex-end;
    }
  }
}
</style>