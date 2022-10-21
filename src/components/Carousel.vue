<template>
  <div
    id="carouselExampleControls"
    class="carousel slide carousel-fade"
    data-bs-ride="carousel"
  >
    <div class="carousel-inner">
      <div class="carousel-item active carousel-field d-flex">
        <div class="carousel-card">
          <router-link to="/home/movie">
            <img :src="image_path + 'img1.png'" alt="..." />
          </router-link>
          <div class="info-movies" v-if="hiddenMovieInfo">
            <h3>Nome do filme</h3>
            <span>Duração: 2h5min</span>
            <StarRating class="rating" />
          </div>
        </div>
        <div class="carousel-card">
          <router-link to="/home/movie">
            <img :src="image_path + 'img2.png'" alt="..." />
          </router-link>
          <div class="info-movies" v-if="hiddenMovieInfo">
            <h3>Nome do filme</h3>
            <span>Duração: 2h5min</span>
            <StarRating class="rating" />
          </div>
        </div>
        <div class="carousel-card">
          <router-link to="/home/movie">
            <img :src="image_path + 'img3.png'" alt="..." />
          </router-link>
          <div class="info-movies" v-if="hiddenMovieInfo">
            <h3>Nome do filme</h3>
            <span>Duração: 2h5min</span>
            <StarRating class="rating" />
          </div>
        </div>
        <div class="carousel-card">
          <router-link to="/home/movie">
            <img :src="image_path + 'img6.png'" alt="..." />
          </router-link>
          <div class="info-movies" v-if="hiddenMovieInfo">
            <h3>Nome do filme</h3>
            <span>Duração: 2h5min</span>
            <StarRating class="rating" />
          </div>
        </div>
      </div>
      <div class="carousel-item active carousel-field d-flex">
        <div class="carousel-card">
          <router-link to="/home/movie">
            <img :src="image_path + 'img6.png'" alt="..." />
          </router-link>
          <div class="info-movies" v-if="hiddenMovieInfo">
            <h3>Nome do filme</h3>
            <span>Duração: 2h5min</span>
            <StarRating class="rating" />
          </div>
        </div>
        <div class="carousel-card">
          <router-link to="/home/movie">
            <img :src="image_path + 'img3.png'" alt="..." />
          </router-link>
          <div class="info-movies" v-if="hiddenMovieInfo">
            <h3>Nome do filme</h3>
            <span>Duração: 2h5min</span>
            <StarRating class="rating" />
          </div>
        </div>
        <div class="carousel-card">
          <router-link to="/home/movie">
            <img :src="image_path + 'img5.png'" alt="..." />
          </router-link>
          <div class="info-movies" v-if="hiddenMovieInfo">
            <h3>Nome do filme</h3>
            <span>Duração: 2h5min</span>
            <StarRating class="rating" />
          </div>
        </div>
        <div class="carousel-card">
          <router-link to="/home/movie">
            <img :src="image_path + 'img6.png'" alt="..." />
          </router-link>
          <div class="info-movies" v-if="hiddenMovieInfo">
            <h3>Nome do filme</h3>
            <span>Duração: 2h5min</span>
            <StarRating class="rating" />
          </div>
        </div>
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
    };
  },
});
</script>

<style lang="scss" scoped></style>
