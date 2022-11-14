<template>
  <div class="container-fv">
    <header-app />
    <b-container class="pt-5 favorite-container">
      <div class="pb-2">
        <h3 class="title">Meus favoritos</h3>
      </div>
      <!--if favorite section is empty-->
      <div class="description" v-if="this.favorites.length === 0">
        <p>
          Parece que você ainda não tem filmes ou séries favoritados.<span>
            Se quiser favoritar, é só clicar no ícone de coração
            <Icon icon="carbon:favorite" /> no card do filme ou série
            escolhidos!
          </span>
        </p>
      </div>
      <b-row
        v-for="favorite in this.favorites"
        :key="favorite.result._id"
        col
        no-gutters
        class="base-structure"
      >
        <div class="movie-information">
          <div
            class="d-flex justify-content-center align-items-center"
            v-if="
              this.favorites.indexOf(favorite) <= oldRole &&
              this.favorites.indexOf(favorite) >= actualElement
            "
          >
            <div
              class="btn-trash-structure d-flex justify-content-center align-items-center"
            >
              <Icon
                icon="carbon:delete"
                class="icon-delete"
                @click="callOptionsModal(favorite.result._id)"
              />
            </div>
            <OptionsModal
              v-if="hiddenOptionModal && id === favorite.result._id"
              :action="`Você quer mesmo remover o filme ${favorite.result.title} dos favoritos?`"
              :hiddenBtnRemoveFav="true"
              @redirect="
                deleteFavorite(
                  favorite.result._id,
                  this.favorites.indexOf(favorite),
                )
              "
              @closeWindow="closeOptionModal"
            />
          </div>
          <div
            cols="5"
            class="mt-5"
            v-if="
              this.favorites.indexOf(favorite) <= this.oldRole &&
              this.favorites.indexOf(favorite) >= this.actualElement
            "
          >
            <b-row>
              <b-col cols="4">
                <b-card-img
                  :src="favorite.result.poster || vazio.poster"
                  v-if="
                    favorite.result.poster
                      ? favorite.result.poster
                      : vazio.poster
                  "
                  onerror="this.onerror=null;this.src='/img/empty-img.png';"
                  class="rounded-0"
                ></b-card-img>
              </b-col>
              <b-col cols="7" class="card-info">
                <b-card-body>
                  <b-card-title
                    class="pb-2"
                    v-if="
                      favorite.result.title
                        ? favorite.result.title
                        : vazio.title
                    "
                  >
                    {{ favorite.result.title || vazio.title }}
                  </b-card-title>
                </b-card-body>
                <span class="duration">
                  Duração:
                  {{
                    Math.trunc(favorite.result.runtime / 60) +
                    'h' +
                    (favorite.result.runtime % 60) +
                    'min'
                  }}
                </span>
                <div class="d-flex">
                  <span class="pt-1">Avaliação</span>
                  <StarRating
                    class="ms-1 -flex"
                    :ratingRawValue="favorite.result.imdb.rating"
                  />
                </div>
              </b-col>
            </b-row>
          </div>
        </div>
        <b-col
          cols="6"
          class="sinopse"
          v-if="
            this.favorites.indexOf(favorite) <= this.oldRole &&
            this.favorites.indexOf(favorite) >= this.actualElement
          "
        >
          <div
            v-if="
              (this.fullPlot === false &&
                this.actualIndex !== this.favorites.indexOf(favorite)) ||
              this.actualIndex !== this.favorites.indexOf(favorite)
            "
          >
            <b-card-title class="pb-2">Sinopse: </b-card-title>
            <p v-if="favorite.result.plot ? favorite.result.plot : vazio.plot">
              {{ favorite.result.plot || vazio.plot }}
            </p>
            <div
              v-if="favorite.result.plot"
              @click="fullPlotClick(this.favorites.indexOf(favorite))"
            >
              <p class="d-flex justify-content-end view-more">Ver mais</p>
            </div>
          </div>
          <div v-else>
            <b-card-title class="pb-2">Sinopse: </b-card-title>
            <p
              v-if="
                favorite.result.fullplot ? favorite.result.fullplot : vazio.plot
              "
            >
              {{ favorite.result.fullplot || vazio.plot }}
            </p>
            <div
              v-if="
                favorite.result.fullplot &&
                this.actualIndex === this.favorites.indexOf(favorite)
              "
              @click="fullPlotClick(this.favorites.indexOf(favorite))"
            >
              <p class="d-flex justify-content-end view-more">Ver menos</p>
            </div>
          </div>
        </b-col>
      </b-row>
      <div class="pt-5 d-flex justify-content-end">
        <PaginationPage
          v-model="currentPage"
          :per-page="perPage"
          :rows="rows"
          @click="changePage"
          v-if="this.favorites.length !== 0"
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
import OptionsModal from '@/components/Modals/OptionsModal.vue';

export default defineComponent({
  components: { HeaderApp, StarRating, Icon, PaginationPage, OptionsModal },
  data() {
    return {
      perPage: 5,
      currentPage: 1,
      actualElement: 0,
      oldRole: 4,
      vazio: {
        poster: '/img/empty-img.png',
        title: 'Filme sem titulo',
        plot: 'filme sem sinopse',
      },
      favorites: [],
      hiddenOptionModal: false,
      id: '',
      fullPlot: false,
      actualIndex: -1,
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
    callOptionsModal(id: string) {
      this.hiddenOptionModal = true;

      this.id = id;
    },
    closeOptionModal() {
      this.hiddenOptionModal = false;
    },
    async deleteFavorite(data: string, FavoriteIndex: any) {
      this.favorites.splice(FavoriteIndex, 1);
      await this.$store.dispatch('Favorites/deleteFavorite', {
        id: this.$store.state.Users.UserId,
        movie: {
          movie_Id: data,
        },
      });
    },
    changePage() {
      this.oldRole = this.perPage * this.currentPage - 1;
      this.actualElement = this.perPage * (this.currentPage - 1);
    },
    fullPlotClick(data: number) {
      this.fullPlot = !this.fullPlot;
      this.actualIndex = data;
      if (this.fullPlot === false) {
        this.actualIndex = -1;
      }
    },
  },
});
</script>
