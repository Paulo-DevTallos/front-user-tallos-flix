<template>
  <carousel
    :items-to-show="4"
    :items-to-scroll="1"
    :wrapAround="true"
    snapAlign="start"
  >
    <slide v-for="movie in movies" :key="movie.id" class="carousel__slide">
      <div class="carousel-card">
        <router-link to="/home/movie">
          <img :src="movie.poster" :alt="movie.title" />
        </router-link>
        <div class="info-movies" v-if="hiddenMovieInfo">
          <h3>{{ movie.title }}</h3>
          <span>Duração: {{ movie.time }}</span>
          <StarRating class="rating" />
        </div>
      </div>
    </slide>
    <template #addons>
      <navigation />
      <pagination v-if="false" />
    </template>
  </carousel>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';
import StarRating from './Rating/StarRating.vue';
import { APP_URL } from '@/constants';

export default defineComponent({
  name: 'carousel-slide',
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
    StarRating,
  },
  props: {
    hiddenMovieInfo: { type: Boolean },
  },
  data() {
    return {
      image_path: APP_URL + 'img/',
      movies: [
        {
          id: 1,
          poster: this.image_path + 'img6.png',
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
          poster: 'img/img3.png', //'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLnv5c0wq18JR5YRrFI6CC_B9kB5Zqz461ZqK-LyzR6-9RiE_W',
          title: 'Filme do Pelé',
          time: '2h5min',
          imdb: 5,
        },
        {
          id: 4,
          poster: 'img/img2.png', //'https://br.web.img3.acsta.net/c_310_420/pictures/21/11/08/16/02/3963914.png',
          title: 'Homem Aranha: sem volta pra casa',
          time: '2h5min',
          imdb: 4.7,
        },
        {
          id: 5,
          poster: 'img/img1.png', //'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSp-lzoeSCvEzSiLDBiaeBprFOMjlry4SdUot2GfS8inDd-BoyX',
          title: 'Parasita',
          time: '2h5min',
          imdb: 3.7,
        },
        {
          id: 6,
          poster: 'img/img2.png', //'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSp-lzoeSCvEzSiLDBiaeBprFOMjlry4SdUot2GfS8inDd-BoyX',
          title: 'Jurassic World: Domínio',
          time: '2h5min',
          imdb: 4,
        },
        {
          id: 7,
          poster: 'img/img3.png', //'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSp-lzoeSCvEzSiLDBiaeBprFOMjlry4SdUot2GfS8inDd-BoyX',
          title: 'Thor Amor e Trovão',
          time: '2h5min',
          imdb: 3,
        },
        {
          id: 8,
          poster: 'img/img4.png', //'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSp-lzoeSCvEzSiLDBiaeBprFOMjlry4SdUot2GfS8inDd-BoyX',
          title: 'The Batman',
          time: '2h5min',
          imdb: 4.7,
        },
      ],
    };
  },
});
</script>

<style lang="scss" scoped></style>
