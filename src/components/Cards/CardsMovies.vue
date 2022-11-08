<template>
  <b-row cols="1" cols-sm="2" cols-md="2" cols-lg="2">
    <b-col
      v-for="movie in moviesRender"
      :key="movie._id"
      col
      no-gutters
      class="mt-5"
    >
      <b-card no-body class="overflow-hidden">
        <b-row class="d-flex justify-content-center">
          <b-col lg="4">
            <b-card-img
              :src="movie.poster || vazio.poster"
              v-if="movie.poster ? movie.poster : vazio.poster"
              class="rounded-0"
            ></b-card-img>
          </b-col>
          <b-col lg="7">
            <b-card-body
              class="d-flex flex-column-reverse h-100 pb-0 card-body"
            >
              <div>
                <b-card-title v-if="movie.title ? movie.title : vazio.title">{{
                  movie.title || vazio.title
                }}</b-card-title>
                <b-card-subtitle
                  >Duração:
                  {{
                    Math.trunc(movie.runtime / 60) +
                    'h' +
                    (movie.runtime % 60) +
                    'min'
                  }}</b-card-subtitle
                >
                <div class="d-flex">
                  <star-rating :ratingRawValue="movie.imdb.rating" />
                </div>
                <router-link :to="{ path: `/home/movieLocation/${movie._id}` }">
                  <b-button
                    size="lg"
                    class="w-75 btn-movie"
                    @click="currentMovie(movie)"
                  >
                    Ver cinemas
                  </b-button>
                </router-link>
              </div>
            </b-card-body>
          </b-col>
        </b-row>
      </b-card>
    </b-col>
  </b-row>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import StarRating from '../Rating/StarRating.vue';

export default defineComponent({
  components: {
    StarRating,
  },
  data() {
    return {
      vazio: {
        poster: '/img/empty-img.png',
        title: 'Filme sem titulo',
      },
    };
  },
  props: {
    moviesRender: {
      type: Function,
    },
  },
  methods: {
    currentMovie(movie: Object) {
      this.$store.state.Movies.currentMovie = movie;
    },
  },
});
</script>
<style lang="scss" scoped>
</style>
