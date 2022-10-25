<template>
  <div class="card-fluid card-config">
    <div class="poster-container">
      <div class="poster-wd">
        <img
          :src="this.$store.state.Movies.currentMovie.poster"
          alt="card-filme"
        />
      </div>
      <div class="available-field">
        <span>Avaliação</span>
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
            <span>{{ Movie }}</span>
          </div>
        </div>
        <p>Duração: {{ this.$store.state.Movies.currentMovie.runtime }}</p>
        <div class="icon-favorite">
          <Icon icon="carbon:favorite" />
          <p id="tag-favorite">Salvar na minha lista</p>
        </div>
      </header>
      <div class="btn-trailer-container">
        <button class="trailer-btn" @click="$emit('traillerModal')">
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
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Icon } from '@iconify/vue';

export default defineComponent({
  name: 'CardMovie',
  components: { Icon },
  emits: ['traillerModal'],
});
</script>

<style lang="scss" scoped></style>
