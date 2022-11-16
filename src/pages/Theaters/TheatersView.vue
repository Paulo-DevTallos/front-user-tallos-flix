<template>
  <b-container class="pt-5 pb-5" fluid>
    <cards-movies :moviesRender="$store.state.Movies.Movies.content" />
  </b-container>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import CardsMovies from '@/components/Cards/CardsMovies.vue';

export default defineComponent({
  components: {
    CardsMovies,
  },
  data() {
    return {
      page: 1,
      limit: 10,
    };
  },
  computed: {
    rows() {
      return this.$store.state.Movies.Movies.numberOfElements;
    },
  },
  methods: {
    reloadRequest() {
      try {
        this.$store.dispatch('Movies/getMovieFilter', {
          page: this.page,
          limit: this.limit,
          sortValue: -1,
        });
      } catch (error) {
        return [];
      }
    },
    handlePageChange() {
      this.page + 1;
      this.reloadRequest();
    },
  },
  mounted() {
    this.reloadRequest();
    this.$store.state.Movies.IsMovieGenre = false;
    this.$store.state.Movies.IsSeriesGenre = false;
    this.$store.dispatch('Favorites/getFavoriteById',
      this.$store.state.Users.UserId,);
  },
});
</script>
