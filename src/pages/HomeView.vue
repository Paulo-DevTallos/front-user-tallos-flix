<template>
  <div
    class="home-field d-flex justify-content-center align-items-center flex-column gap-5"
  >
    <h1 v-if="user_name_logged ? user_name_logged : title_dislogged">
      {{ user_name_logged || title_dislogged }} sobre qual filme quer conhecer hoje ?
    </h1>
    <SearchBar @search="searchMovie" />
    <div class="home-carousel" v-if="hiddenCarousel">
      <SlideCarousel :hiddenMovieInfo="false" :title_carousel="'Nos Cinemas'" />
    </div>
    <ErrorComponent :data_word="movies_name" v-if="hiddenErrorSearch" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { SocketModule } from '@/services/socket';
import ErrorComponent from '@/components/ErrorComponent.vue';
import SlideCarousel from '@/components/Carousel/SlideCarousel.vue';
import SearchBar from '@/components/SearchBar/SearchBar.vue';
import { mapGetters } from 'vuex';

export default defineComponent({
  name: 'HomeView',
  components: {
    SearchBar,
    ErrorComponent,
    SlideCarousel,
  },
  data() {
    return {
      socketService: SocketModule.connect(),
      isChanged: '',
      movies_name: '',
      title_dislogged: 'Olá,',
      user_name_logged: `Ola${ this.$store.state.Users.UserName.split(' ')
        .slice(0, 2)
        .toString()
        .replace(',', ' ')},`,
      hiddenCarousel: true,
      hiddenErrorSearch: false,
      render: false,
    };
  },

  methods: {
    searchMovie(data: string) {
      this.$store.state.Movies.dontRender = true;
      this.$store.state.Movies.searchData = data;
    },
    /*searchMovie(data: string) {
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
    },*/
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
