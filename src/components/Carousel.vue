<template>
  <div
    id="carouselExampleControls"
    class="carousel slide carousel-fade"
    data-bs-ride="carousel"
  >
    <div class="carousel-inner">
      <div class="carousel-item active carousel-field d-flex">
        <div class="carousel-card" v-for="movie in renderPageItem" :key="movie.id">
          <router-link to="/home/movie">
            <img :src="movie.poster" :alt="movie.title" />
          </router-link>
          <div class="info-movies" v-if="hiddenMovieInfo">
            <h3>{{ movie.title }}</h3>
            <span>Duração: {{ movie.time }}</span>
            <StarRating class="rating"/>
          </div>
        </div>
        <!--<div class="carousel-card">
          <router-link to="/home/movie">
            <img :src="image_path + 'img6.png'" alt="..." />
          </router-link>
          <div class="info-movies" v-if="hiddenMovieInfo">
            <h3>Nome do filme</h3>
            <span>Duração: 2h5min</span>
            <StarRating class="rating"/>
          </div>
        </div>-->
      </div>
    </div>
    <button
      class="carousel-control-prev carousel-button-left"
      type="button"
      data-bs-target="#carouselExampleControls"
      data-bs-slide="prev"
    >
      <Icon
        icon="carbon:chevron-left"
        aria-hidden="true"
        width="37"
        height="37"
        class="slide-icon rounded-circle"
      />
      <span class="visually-hidden">Previous</span>
    </button>
    <button
      class="carousel-control-next carousel-button-right"
      type="button"
      data-bs-target="#carouselExampleControls"
      data-bs-slide="next"
    >
      <Icon
        icon="carbon:chevron-right"
        aria-hidden="true"
        width="37"
        height="37"
        class="slide-icon rounded-circle"
      />
      <span class="visually-hidden">Next</span>
    </button>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import StarRating from './Rating/StarRating.vue';
import { Icon } from '@iconify/vue';
import { APP_URL } from '@/constants';

export default defineComponent({
  name: 'carousel-slide',
  components: { Icon, StarRating },
  props: {
    hiddenMovieInfo: { type: Boolean },
  },
  data() {
    return {
      image_path: APP_URL + 'img/',
      perPage: 4,
      currentPage: 1,
      movies: [
        {
          id: 1,
          poster: 'img/img6.png',
          title: 'Não! Não Olhe!',
          time: '2h5min',
          imdb: 4.5,
        },
        {
          id: 2,
          poster: 'img/img4.png',
          title: 'TICKET to PARADISE',
          time: '2h5min',
          imdb: 3.5,
        },
        {
          id: 3,
          poster: 'img/img3.png',//'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLnv5c0wq18JR5YRrFI6CC_B9kB5Zqz461ZqK-LyzR6-9RiE_W',
          title: 'Filme do Pelé',
          time: '2h5min',
          imdb: 5,
        },
        {
          id: 4,
          poster: 'img/img2.png',//'https://br.web.img3.acsta.net/c_310_420/pictures/21/11/08/16/02/3963914.png',
          title: 'Homem Aranha: sem volta pra casa',
          time: '2h5min',
          imdb: 4.7,
        },
        {
          id: 5,
          poster: 'img/img1.png',//'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSp-lzoeSCvEzSiLDBiaeBprFOMjlry4SdUot2GfS8inDd-BoyX',
          title: 'Parasita',
          time: '2h5min',
          imdb: 3.7,
        },
        {
          id: 6,
          poster: 'img/img2.png',//'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSp-lzoeSCvEzSiLDBiaeBprFOMjlry4SdUot2GfS8inDd-BoyX',
          title: 'Jurassic World: Domínio',
          time: '2h5min',
          imdb: 4,
        },
        {
          id: 7,
          poster: 'img/img3.png',//'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSp-lzoeSCvEzSiLDBiaeBprFOMjlry4SdUot2GfS8inDd-BoyX',
          title: 'Thor Amor e Trovão',
          time: '2h5min',
          imdb: 3,
        },
        {
          id: 8,
          poster: 'img/img4.png',//'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSp-lzoeSCvEzSiLDBiaeBprFOMjlry4SdUot2GfS8inDd-BoyX',
          title: 'The Batman',
          time: '2h5min',
          imdb: 4.7,
        },
      ],
    };
  },

  computed: {
    renderPageItem(): object {
      return this.movies.slice(
        (this.currentPage -1) * this.perPage,
        this.currentPage * this.perPage,
      );
    },
  },
});
</script>

<style lang="scss" scoped></style>
 