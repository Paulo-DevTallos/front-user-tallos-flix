<template>
  <div class="container-full">
    <h4>{{ title_carousel }}</h4>
    <button @click="prev" class="arrow-left">
      <Icon icon="carbon:chevron-left" />
    </button>
    <button @click="next" class="arrow-right">
      <Icon icon="carbon:chevron-right" />
    </button>
    <div class="carousel-container">
      <div
        v-for="movie in $store.state.Movies.Movies.content"
        :key="movie._id"
        class="gallery-wrapper"
      >
        <div class="gallery-movies">
          <img
            class="item-image-poster"
            v-if="movie.poster ? movie.poster : empty.poster"
            :src="movie.poster || empty.poster"
            alt="movie.title"
          />
        </div>
        <div class="card-info-movies" v-if="hiddenMovieInfo">
          <h4
            v-if="
              movie.title.length > 16
                ? (substring = `${movie.title.substring(0, 16)}...`)
                : (substring = `${movie.title.substring(0, 16)} `)
            "
          >
            {{ substring }}
          </h4>
          <p>
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
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Icon } from '@iconify/vue';
import StarRating from '../Rating/StarRating.vue';

export default defineComponent({
  name: 'SlideCarousel',
  components: { Icon, StarRating },
  props: {
    title_carousel: {
      type: String,
    },
    hiddenMovieInfo: {
      type: Boolean,
    },
  },
  data() {
    return {
      movies: [],
      empty: {
        poster: '/img/empty-img.png',
      },
      substring: '',
    };
  },

  methods: {
    next() {
      const items = document.querySelectorAll('.item-image-poster');
      let currentItem = 0;
      const maxItems = items.length;

      currentItem--;

      if (currentItem >= maxItems) {
        currentItem = 0;
      }

      if (currentItem < 0) {
        currentItem = maxItems - 1;
      }

      items[currentItem].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    },

    prev() {
      const items = document.querySelectorAll('.item-image-poster');
      let currentItem = 0;
      const maxItems = items.length;

      currentItem++;

      if (currentItem <= maxItems) {
        currentItem = 0;
      }

      if (currentItem > 0) {
        currentItem = maxItems + 1;
      }

      items[currentItem].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    },
  },
  mounted() {
    
  },
});
</script>
