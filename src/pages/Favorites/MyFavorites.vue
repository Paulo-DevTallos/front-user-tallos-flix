<template>
  <div class="corpo-fv">
    <header-app />
    <b-container class="pt-5 favorite-container">
      <div class="pb-2">
        <h3>Meus favoritos</h3>
      </div>
      <b-row
        v-for="favorite in this.favorites"
        :key="favorite.result_id"
        col
        no-gutters
        class="mt-5 d-flex"
      >
        <b-col cols="1">
          <div class="h-100 d-flex justify-content-center align-items-center">
            <Icon
              icon="carbon:delete"
              class="icon-delete"
              @click="removeFavorite(favorite.result._id)"
            />
          </div>
        </b-col>
        <b-col cols="5">
          <b-row>
            <b-col cols="4">
              <b-card-img
                :src="favorite.result.poster || vazio.poster"
                v-if="
                  favorite.result.poster ? favorite.result.poster : vazio.poster
                "
                class="rounded-0"
              ></b-card-img>
            </b-col>
            <b-col cols="7">
              <b-card-body>
                <b-card-title
                  class="text-color pb-2"
                  v-if="
                    favorite.result.title ? favorite.result.title : vazio.title
                  "
                  >{{ favorite.result.title || vazio.title }}</b-card-title
                >
              </b-card-body>
              <b-card-subtitle class="text-color"
                >Duração:
                {{
                  Math.trunc(favorite.result.runtime / 60) +
                  'h' +
                  (favorite.result.runtime % 60) +
                  'min'
                }}</b-card-subtitle
              >
              <div class="d-flex">
                <span class="text-color pt-1">Avaliação:</span>
                <StarRating
                  class="ms-1 -flex"
                  v-model="favorite.result.imdb"
                ></StarRating>
              </div>
            </b-col>
          </b-row>
        </b-col>
        <b-col cols="6">
          <div>
            <b-card-title class="text-color pb-2">Sinopse: </b-card-title>
            <b-form-text-area
              class="text-color"
              size="sm"
              plaintext
              v-if="favorite.result.plot ? favorite.result.plot : vazio.plot"
            >
              {{ favorite.result.plot || vazio.plot }}</b-form-text-area
            >
            <div v-if="favorite.result.plot">
              <p class="pt-3 d-flex justify-content-end view-more">Ver mais</p>
            </div>
          </div>
        </b-col>
      </b-row>
      <div class="pt-5 d-flex justify-content-end">
        <PaginationPage
          v-model="currentPage"
          :per-page="perPage"
          :rows="rows"
        ></PaginationPage>
      </div>
    </b-container>
  </div>
</template>
<script lang="ts">
import HeaderApp from '@/components/Header/HeaderApp.vue';
import { Icon } from '@iconify/vue';
import { defineComponent } from 'vue';
import PaginationPage from '../../components/Pagination/PaginationPage.vue';
import StarRating from '../../components/Rating/StarRating.vue';

export default defineComponent({
  components: { HeaderApp, StarRating, Icon, PaginationPage },
  data() {
    return {
      perPage: 3,
      currentPage: 1,
      vazio: {
        poster: '/img/empty-img.png',
        title: 'Filme sem titulo',
        plot: 'filme sem sinopse',
      },
      favorites: [],
    };
  },
  computed: {
    rows() {
      return this.favorites.length;
    },
    itemsForList() {
      return this.favorites.slice(
        (this.currentPage - 1) * this.perPage,
        this.currentPage * this.perPage,
      );
    },
  },
  async mounted() {
    await this.$store.dispatch(
      'Favorites/getFavoriteById',
      this.$store.state.Users.UserId,
    );

    for (
      let index = 0;
      index < this.$store.state.Favorites.Favorite[0].movie_Id.length;
      index++
    ) {
      await this.$store.dispatch(
        'Movies/getMovieFilterId',
        this.$store.state.Favorites.Favorite[0].movie_Id[index],
      );
      this.favorites.push(await this.$store.state.Movies.Movies);
    }
  },
  methods: {
    async removeFavorite(data: string) {
      await this.$store.dispatch('Favorites/deleteFavorite', {
        id: this.$store.state.Users.UserId,
        movie: {
          movie_Id: data,
        },
      });
    },
  },
});
</script>
<style lang="scss" scoped>
.imagem-fv {
  width: 190px;
}
.body-fv {
  padding: 0;
}
.text-color {
  color: white !important;
}
.icon-delete {
  font-size: 24px;
  color: white;
  cursor: pointer;
}
.view-more {
  color: white;
  cursor: pointer;
  text-decoration: underline white;
}
</style>
