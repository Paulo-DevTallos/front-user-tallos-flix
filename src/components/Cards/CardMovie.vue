<template>
  <div class="card-fluid card-config">
    <div class="poster-container">
      <div class="backspace" v-if="routerMovies ? routerMovies : routerSeries">
        <router-link :to="routerMovies || routerSeries" class="return-arrow">
          <Icon icon="bx:arrow-back" />
          Voltar
        </router-link>
      </div>
      <div class="poster-wd">
        <img
          :src="
            this.$store.state.Movies.currentMovie.poster
              ? this.$store.state.Movies.currentMovie.poster
              : `${this.APP_URL}img/empty-img.png`
          "
          alt="card-filme"
          onerror="this.onerror=null;this.src='/img/empty-img.png';"
        />
      </div>
      <div
        class="available-field d-flex pt-3 justify-content-center"
        v-if="
          this.$store.state.Movies.currentMovie.imdb.rating &&
          this.$store.state.Movies.currentMovie.imdb.votes
        "
      >
        <div class="exibition pt-1">
          <span
            >Avaliação ({{
              this.$store.state.Movies.currentMovie.imdb.votes
            }})</span
          >
          <StarRating class="responsive ms-1" v-model="this.rating" />
        </div>
      </div>
      <div v-else class="pb-3"></div>
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
        <p v-if="this.$store.state.Movies.currentMovie.runtime">
          Duração:
          {{
            Math.trunc(this.$store.state.Movies.currentMovie.runtime / 60) +
            'h' +
            (this.$store.state.Movies.currentMovie.runtime % 60) +
            'min'
          }}
        </p>
        <div class="icon-styles" @click="redirectModal">
          <Icon :icon="IconStyle" :color="ColorStyle" id="favoriteIcon" />
          <p id="tag-favorite">Salvar na minha lista</p>
        </div>
        <div class="info-generals-movies">
          <div
            class="d-flex icon-styles"
            v-if="this.$store.state.Movies.currentMovie.imdb.rating"
          >
            <Icon icon="la:imdb" />
            <p>{{ this.$store.state.Movies.currentMovie.imdb.rating }}/10</p>
          </div>
          <div
            class="d-flex icon-styles"
            v-if="
              this.$store.state.Movies.currentMovie.tomatoes &&
              this.$store.state.Movies.currentMovie.tomatoes.viewer &&
              this.$store.state.Movies.currentMovie.tomatoes.critic
            "
          >
            <Icon icon="simple-icons:rottentomatoes" />
            <p>{{ this.TomatoesRating }}%</p>
          </div>
          <div
            class="d-flex"
            v-if="this.$store.state.Movies.currentMovie.awards.text"
          >
            <p>{{ this.$store.state.Movies.currentMovie.awards.text }}</p>
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
            >
              <router-link
                :to="{ path: `/home/Peoples/${Movie}` }"
                @click="GetPeople(Movie, 'directors')"
                class="people-link"
                >{{ Movie }}</router-link
              >
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
              ><router-link
                :to="{ path: `/home/Peoples/${Movie}` }"
                @click="GetPeople(Movie, 'writers')"
                class="people-link"
                >{{ Movie }}</router-link
              >
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
              ><router-link
                :to="{ path: `/home/Peoples/${Movie}` }"
                @click="GetPeople(Movie, 'cast')"
                class="people-link"
                >{{ Movie }}</router-link
              >
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
    <OptionsModal
      v-if="hiddenOptionModal"
      :hiddenBtnLogin="true"
      @closeWindow="closeOptionModal"
      :action="message"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Icon } from '@iconify/vue';
import TraillerModal from '@/components/Modals/TraillerModal.vue';
import StarRating from '../Rating/StarRating.vue';
import OptionsModal from '../Modals/OptionsModal.vue';

export default defineComponent({
  name: 'CardMovie',
  components: { Icon, TraillerModal, StarRating, OptionsModal },
  data() {
    return {
      message: 'Você precisa está logado para adicionar aos favoritos!',
      routerMovies: '/home/movies',
      routerSeries: '/home/series',
      isLogged: localStorage.getItem('token'),
      hiddenOptionModal: false,
      hiddenTraillerModal: false,
      hiddenBtnTrailer: false,
      IconStyle: 'carbon:favorite',
      ColorStyle: 'none',
      IsFavoriteBefore: undefined,
      TomatoesRating: 0,
      APP_URL: import.meta.env.VITE_APP_URL,
      rating: this.$store.state.Movies.currentMovie.imdb.rating / 2,
    };
  },
  methods: {
    redirectModal(): void {
      if (!this.isLogged) {
        this.hiddenOptionModal = true;
      } else {
        this.favoriteMovie();
      }
    },

    closeOptionModal(): void {
      this.hiddenOptionModal = false;
    },

    openTraillerModal(): void {
      this.hiddenTraillerModal = true;
    },

    closeModal(): void {
      this.hiddenTraillerModal = false;
    },

    searchGenre(movie: string) {
      this.$store.state.Movies.actualTag = movie;
      if (this.$store.state.Movies.currentMovie.type === 'movie') {
        this.$store.dispatch('Movies/getMovieFilter', {
          field: 'genres',
          search: movie,
        });
        this.$store.state.Movies.IsMovieGenre = true;
        this.$router.push('/home/movies');
      } else {
        this.$store.dispatch('Movies/getSeries', {
          field: 'genres',
          search: movie,
        });
        this.$store.state.Movies.IsSeriesGenre = true;
        this.$router.push('/home/series');
      }
    },

    favoriteMovie() {
      this.$store.dispatch(
        'Favorites/getFavoriteById',
        this.$store.state.Users.UserId,
      );
      if (this.IconStyle === 'carbon:favorite-filled') {
        this.IconStyle = 'carbon:favorite';
        this.ColorStyle = 'white';
        this.$store.dispatch('Favorites/deleteFavorite', {
          id: this.$store.state.Users.UserId,
          movie: {
            movie_Id: this.$store.state.Movies.currentMovie._id,
          },
        });
      } else {
        if (this.$store.state.Favorites.Favorite.length === 0) {
          this.$store.dispatch('Favorites/createFavorite', {
            user_Id: this.$store.state.Users.UserId,
            movie_Id: this.$store.state.Movies.currentMovie._id,
          });
        } else {
          this.$store.dispatch('Favorites/updateFavorite', {
            id: this.$store.state.Users.UserId,
            movie: {
              movie_Id: this.$store.state.Movies.currentMovie._id,
            },
          });
        }
        this.IconStyle = 'carbon:favorite-filled';
        this.ColorStyle = '#f38765';
      }
    },
    GetPeople(data: string, Field: string) {
      this.$store.state.Favorites.PeopleName = data;
      this.$store.dispatch('Peoples/getPeopleByName', data);
      console.log(Field);
      this.$store.dispatch('Movies/getMovieFilter', {
        field: Field,
        search: data,
      });
    },
  },
  mounted() {
    console.log(this.$store.state.Movies.currentMovie.type);
    this.$store.state.Movies.IsMovieGenre = false;
    this.$store.dispatch(
      'Favorites/getFavoriteById',
      this.$store.state.Users.UserId,
    );
    if (
      this.$store.state.Movies.currentMovie.tomatoes &&
      this.$store.state.Movies.currentMovie.tomatoes.viewer &&
      this.$store.state.Movies.currentMovie.tomatoes.critic
    ) {
      this.TomatoesRating =
        ((this.$store.state.Movies.currentMovie.tomatoes.viewer.rating +
          this.$store.state.Movies.currentMovie.tomatoes.critic.rating) /
          2) *
        10;
    }
  },
  async created() {
    if ((await this.$store.state.Favorites.Favorite.length) !== 0) {
      this.IsFavoriteBefore =
        this.$store.state.Favorites.Favorite[0].movie_Id.find(
          (element: any) =>
            element === this.$store.state.Movies.currentMovie._id,
        );

      if (this.IsFavoriteBefore !== undefined) {
        this.IconStyle = 'carbon:favorite-filled';
        this.ColorStyle = '#f38765';
      }
    }
  },
});
</script>

<style lang="scss" scoped></style>
