<template>
  <div class="carousel-container">
    <button class="arrow-right">Rights</button>
    <button class="arrow-left">Left</button>
    <div
      v-for="movie in $store.state.Movies.Movies.content"
      :key="movie._id"
      class="gallery-wrapper"
    >
      <div class="gallery-movies">
        <img 
          class="item-image-poster" 
          v-if="movie.poster ? movie.poster : empty.poster"
          :src="movie.poster || empty.poster"
          alt="movie.title"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SlideCarousel',
  data() {
    return {
      movies: [],
      empty: {
        poster: '/img/empty-img.png',
      },
    };
  },
});
</script>

<style lang="scss" scoped>
.carousel-container {
  padding: 15px;
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  overflow-x: auto;

  .arrow-left,
  .arrow-right {
    position: absolute;
    top: 0;
    left: 0;
    right: auto;
    bottom: 0;
    font-size: 20px;
    line-height: 250px;
    width: 40px;
    text-align: center;
    color: #fff;
    cursor: pointer;
    border: none;
    opacity: 0.1;
    background-image: linear-gradient(to left, transparent 0%, black 200%);
    transition: all 600ms ease-in-out;

    &:hover {
      opacity: 1;
    }
  }

  .arrow-right {
    left: auto;
    right: 0;
    background-image: linear-gradient(to right, transparent 0%, black 200%);
  }


  .gallery-wrapper {
    .gallery-movies {
      display: flex;
      flex-flow: row wrap;
      gap: 15px;
      padding: 25px;

      .item-image-poster {
        width: 250px;
        height: 330px;
        flex-shrink: 0;
      }
    }
  }
}
</style>