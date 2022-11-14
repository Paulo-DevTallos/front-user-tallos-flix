<template>
  <div
    class="home-field d-flex justify-content-center align-items-center flex-column gap-5"
  >
    <h1>
      Olá {{ this.$store.state.Users.UserName }}, sobre qual filme quer conhecer
      hoje ?
    </h1>
    <SearchBar @search="searchMovie" />
    <div
      class="home-carousel d-flex flex-column p-2 pb-3 mb-3"
      v-if="hiddenCarousel"
    >
      <h4>Nos Cinemas</h4>
      <Carousel :hiddenMovieInfo="false" :IsRendered="render" />
    </div>
    <ErrorComponent :data_word="movies_name" v-if="hiddenErrorSearch" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { SocketModule } from '@/services/socket';
import ErrorComponent from '@/components/ErrorComponent.vue';
import SearchBar from '@/components/SearchBar.vue';
import Carousel from '@/components/Carousel.vue';
import { mapGetters } from 'vuex';

export default defineComponent({
  name: 'HomeView',
  components: {
    SearchBar,
    ErrorComponent,
    Carousel,
  },
  data() {
    return {
      socketService: SocketModule.connect(),
      isChanged: '',
      movies_name: '',
      hiddenCarousel: true,
      hiddenErrorSearch: false,
      render: false,
    };
  },

  methods: {
    searchMovie(data: string) {
      if (data !== this.isChanged) {
        this.isChanged = data;
        setTimeout(() => {
          this.movies_name = data;
          if (this.isChanged === data) {
            this.$store.dispatch('Movies/getMovieFilter', {
              field: 'title',
              search: data,
            });
          }
        }, 1000);
      }
    },
  },

  watch: {
    ['Movies/getErrorPage'](data) {
      if (data === true) {
        this.hiddenErrorSearch = true;
        this.hiddenCarousel = false;
         this.render = false;
      } else {
        this.hiddenErrorSearch = false;
        this.hiddenCarousel = true;
        this.render = true;
      }
    },
  },

  computed: {
    ...mapGetters(['Movies/getErrorPage']),
  },

  mounted() {
    this.socketService.registerListener('is-logged', 'is-logged', (data) => {
      alert(data);
    });
    this.$store.dispatch(
      'Favorites/getFavoriteById',
      this.$store.state.Users.UserId,
    );
    this.$store.dispatch(
      'Favorites/getFavoriteById',
      this.$store.state.Users.UserId,
    );
  },
});
</script>
<style lang="scss" scoped></style>
