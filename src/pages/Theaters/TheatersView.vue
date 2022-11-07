<template>
  <b-container class="pt-5 pb-5" fluid>
    <cards-movies :moviesRender="this.$store.state.Movies.Movies.content" />
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
import CardsMovies from '@/components/Cards/CardsMovies.vue';
import pagination from '@/components/Pagination/PaginationPage.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    pagination,
    CardsMovies,
  },
  data() {
    return {
      page: 1,
      limit: 8,
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
    this.$store.dispatch(
      'Favorites/getFavoriteById',
      this.$store.state.Users.UserId,
    );
  },
});
</script>
<style lang="scss" scoped></style>
