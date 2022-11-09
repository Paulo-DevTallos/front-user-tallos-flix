<template>
  <carousel
    :items-to-show="4"
    :items-to-scroll="1"
    :wrapAround="false"
    snapAlign="start"
  >
    <slide
      v-for="movie in this.RenderSeries === false
        ? this.$store.state.Movies.Movies.content
        : this.$store.state.Movies.Series.content"
      :key="movie.id"
      class="carousel__slide"
    >
      <div>
        <div class="carousel-card">
          <div class="image-container">
            <router-link
              :to="{ path: `/home/movie` }"
              v-if="this.RenderSeries == false"
            >
              <img
                v-if="movie.poster ? movie.poster : empty.poster"
                :src="movie.poster || empty.poster"
                :alt="movie.title"
                onerror="this.onerror=null;this.src='/img/empty-img.png';"
                @click="currentMovie(movie)"
              />
            </router-link>
            <router-link :to="{ path: `/home/serie` }" v-else>
              <img
                v-if="movie.poster ? movie.poster : empty.poster"
                :src="movie.poster || empty.poster"
                :alt="movie.title"
                onerror="this.onerror=null;this.src='/img/empty-img.png';"
                @click="currentMovie(movie)"
              />
            </router-link>
          </div>
        </div>
        <div class="info-movies" v-if="hiddenMovieInfo">
          <h3>{{ movie.title }}</h3>
          <p v-if="movie.runtime">
            Duração:
            {{
              Math.trunc(movie.runtime / 60) +
              'h' +
              (movie.runtime % 60) +
              'min'
            }}
          </p>
          <StarRating class="rating" :ratingRawValue="movie.imdb.rating" />
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
    RenderSeries: { type: Boolean },
    People: { type: Boolean },
    IsRendered: {type: Boolean}
  },
  data() {
    return {
      image_path: import.meta.env.VITE_APP_URL + 'img/',
      movies: [],
      empty: {
        poster: '/img/empty-img.png',
      },
    };
  },

  methods: {
    currentMovie(movie: object) {
      this.$store.state.Movies.currentMovie = movie;
    },
  },
  async mounted() {
    if (this.People === false && this.IsRendered === false) {
      if (this.$store.state.Movies.IsMovieGenre == false) {
        if (this.RenderSeries === true) {
          await this.$store.dispatch('Movies/getSeries');
        } else {
          await this.$store.dispatch('Movies/getMovieFilter');
        }
      } else {
        this.$store.state.Movies.IsMovieGenre == true;
      }
    }
  },
});
</script>

<style lang="scss" scoped></style>
