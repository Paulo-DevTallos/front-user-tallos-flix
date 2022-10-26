<template>
  <b-container class="pt-5 pb-5" fluid>
    <b-row cols="1" cols-sm="2" cols-md="2" cols-lg="2">
      <b-col
        v-for="movie in this.$store.state.Movies.Movies.content"
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
                  <b-card-title
                    v-if="movie.title ? movie.title : vazio.title"
                    >{{ movie.title || vazio.title }}</b-card-title
                  >
                  <b-card-subtitle>Duração: {{ movie.time }}</b-card-subtitle>
                  <div class="d-flex">
                    <star-rating v-model="movie.imdb.rating" />
                  </div>
                  <router-link
                    :to="{ path: `/home/movieLocation/${movie._id}` }"
                  >
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
    <div class="pt-5 d-flex justify-content-end">
      <pagination
        class="paginationTT"
        v-model="page"
        :per-page="limit"
        :rows="rows"
        @click="handlePageChange"
      ></pagination>
    </div>
  </b-container>
</template>
<script lang="ts">
import pagination from '@/components/Pagination/PaginationPage.vue';
import { defineComponent } from 'vue';
import StarRating from '../../components/Rating/StarRating.vue';

export default defineComponent({
  components: {
    pagination,
    StarRating,
  },
  data() {
    return {
      page: 1,
      limit: 8,
      vazio: {
        poster: '/img/empty-img.png',
        title: 'Filme sem titulo',
      },
    };
  },
  computed: {
    rows() {
      return this.$store.state.Movies.Movies.numberOfElements;
    },
    itemsForList() {
      return this.reloadRequest();
    },
  },
  methods: {
    reloadRequest() {
      try {
        this.$store.dispatch('Movies/getMovieFilter', {
          page: this.page,
          limit: this.limit,
        });
      } catch (error) {
        return [];
      }
    },
    handlePageChange() {
      this.page + 1;
      this.reloadRequest();
    },
    currentMovie(movie: Object) {
      this.$store.state.Movies.currentMovie = movie;
    },
  },
  mounted() {
    this.reloadRequest();
    this.$store.state.Movies.IsMovieGenre = false;
  },
});
</script>
<style lang="scss" scoped></style>
