<template>
  <carousel
    :items-to-show="4"
    :items-to-scroll="1"
    :wrapAround="true"
    snapAlign="start"
  >
    <slide
      v-for="movie in this.$store.state.Movies.Movies.content"
      :key="movie.id"
      class="carousel__slide"
    >
      <div >
        <div class="carousel-card">
          <router-link to="/home/movie">
            <img :src="movie.poster" :alt="movie.title" />
          </router-link>
        </div>
        <div class="info-movies" v-if="hiddenMovieInfo">
          <h3>{{ movie.title }}</h3>
          <span>Duração: {{ movie.time }}</span>
          <StarRating class="rating" />
        </div>
      </div>
    </slide>
    <template #addons>
      <navigation>
        <template #next>
          <span class="icon-style position-rigth">
            <Icon icon="carbon:chevron-right" />
          </span>
        </template>
        <template #prev>
          <span class="icon-style position-left">
            <Icon icon="carbon:chevron-left" />
          </span>
        </template>
      </navigation>
    </template>
  </carousel>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Navigation } from 'vue3-carousel';
import StarRating from './Rating/StarRating.vue';
import { APP_URL } from '@/constants';
import { Icon } from '@iconify/vue';

export default defineComponent({
  name: 'carousel-slide',
  components: {
    Carousel,
    Slide,
    Navigation,
    StarRating,
    Icon,
  },
  props: {
    hiddenMovieInfo: { type: Boolean },
  },
  data() {
    return {
      image_path: APP_URL + 'img/',
      movies: [],
    };
  },
  mounted() {
    this.$store.dispatch('Movies/getMovieFilter');
  }
});
</script>

<style lang="scss" scoped></style>
