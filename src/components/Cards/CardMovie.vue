<template>
  <div class="card-fluid card-config">
    <div class="poster-container">
      <div class="backspace">
        <Icon icon="bx:arrow-back" />
        Voltar
      </div>
      <div class="poster-wd">
        <img
          :src="this.$store.state.Movies.currentMovie.poster"
          alt="card-filme"
        />
      </div>
      <div class="available-field">
        <span>Avaliação</span>
        <StarRating />
      </div>
    </div>
    <div class="info-movie">
      <header class="card-header">
        <h2>{{ this.$store.state.Movies.currentMovie.title }}</h2>
        <div class="d-flex gap-2">
          <div
            v-for="Movie in this.$store.state.Movies.currentMovie.genres"
            :key="Movie.length"
          >
            <span class="tagGenre" @click="searchGenre(Movie)">{{
              Movie
            }}</span>
          </div>
        </div>
        <p>Duração: {{ this.$store.state.Movies.currentMovie.runtime }}</p>
        <div class="icon-styles">
          <Icon
            :icon="IconStyle"
            @click="favoriteMovie"
            :color="ColorStyle"
            id="favoriteIcon"
          />
          <p id="tag-favorite">Salvar na minha lista</p>
        </div>
        <div class="info-generals-movies">
          <div class="d-flex icon-styles">
            <Icon icon="la:imdb" />
            <p>7.8/10</p>
          </div>
          <div class="d-flex icon-styles">
            <Icon icon="simple-icons:rottentomatoes" />
            <p>68%</p>
          </div>
          <div class="d-flex">
            <p>Ganhador de 1 oscar, 5 indicações</p>
          </div>
        </div>
      </header>
      <div
        v-if="
          this.$store.state.Movies.currentMovie.trailer
            ? this.$store.state.Movies.currentMovie.trailer
            : hiddenBtnTrailer
        "
        class="btn-trailer-container"
      >
        <button class="trailer-btn" @click="openTraillerModal">
          <Icon icon="carbon:play-filled" />
          Trailer
        </button>
      </div>
      <div class="card-technics">
        <ul>
          <li>
            Diretor:
            <span
              v-for="Movie in this.$store.state.Movies.currentMovie.directors"
              :key="Movie.length"
              >{{ Movie }}
              <span
                v-if="
                  this.$store.state.Movies.currentMovie.directors.indexOf(
                    Movie,
                  ) <
                  this.$store.state.Movies.currentMovie.directors.length - 1
                "
              >
                ,
              </span>
            </span>
          </li>
          <li>
            Roteiro:
            <span
              v-for="Movie in this.$store.state.Movies.currentMovie.writers"
              :key="Movie.length"
              >{{ Movie }}
              <span
                v-if="
                  this.$store.state.Movies.currentMovie.writers.indexOf(Movie) <
                  this.$store.state.Movies.currentMovie.writers.length - 1
                "
              >
                ,
              </span>
            </span>
          </li>
          <li>
            Elenco:
            <span
              v-for="Movie in this.$store.state.Movies.currentMovie.cast"
              :key="Movie.length"
              >{{ Movie }}
              <span
                v-if="
                  this.$store.state.Movies.currentMovie.cast.indexOf(Movie) <
                  this.$store.state.Movies.currentMovie.cast.length - 1
                "
              >
                ,
              </span>
            </span>
          </li>
          <li>
            Titulo Original: {{ this.$store.state.Movies.currentMovie.title }}
          </li>
        </ul>
      </div>
    </div>
    <TraillerModal
      :trailer_file="this.$store.state.Movies.currentMovie.trailer"
      v-if="hiddenTraillerModal"
      @closeWindow="closeModal"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Icon } from '@iconify/vue';
import TraillerModal from '@/components/Modals/TraillerModal.vue';
import StarRating from '../Rating/StarRating.vue';

export default defineComponent({
  name: 'CardMovie',
  components: { Icon, TraillerModal, StarRating },
  /*props: {
    hiddenBtnTrailer: { type: Boolean },
  },*/
  data() {
    return {
      hiddenTraillerModal: false,
      hiddenBtnTrailer: false,
      IconStyle: 'carbon:favorite',
      ColorStyle: 'none',
    };
  },
  methods: {
    openTraillerModal(): void {
      this.hiddenTraillerModal = true;
    },

    closeModal(): void {
      this.hiddenTraillerModal = false;
    },

    searchGenre(movie: string) {
      this.$store.state.Movies.actualTag = movie;
      this.$store.dispatch('Movies/getMovieFilter', {
        field: 'genres',
        search: movie,
      });
      this.$store.state.Movies.IsMovieGenre = true;
      this.$router.push('/home/movies');
    },

    favoriteMovie() {
      if (this.IconStyle === 'carbon:favorite-filled') {
        this.IconStyle = 'carbon:favorite';
        this.ColorStyle = 'white';
      } else {
        this.IconStyle = 'carbon:favorite-filled';
        this.ColorStyle = '#f38765';
      }
    },
  },
  mounted() {
    this.$store.state.Movies.currentMovie.runtime =
      Math.trunc(this.$store.state.Movies.currentMovie.runtime / 60) +
      'h' +
      (this.$store.state.Movies.currentMovie.runtime % 60) +
      'min';
    this.$store.state.Movies.IsMovieGenre = false;
  },
});
</script>

<style lang="scss" scoped></style>
