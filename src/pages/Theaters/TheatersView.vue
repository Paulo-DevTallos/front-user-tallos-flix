<template>
  <b-container class="pt-5 pb-5" fluid>
    <b-row cols="1" cols-sm="2" cols-md="2" cols-lg="2">
      <b-col
        v-for="movie in this.$store.state.Movies.Movies.content"
        :key="movie.id"
        col
        no-gutters
        class="mt-5"
      >
        <b-card no-body class="overflow-hidden">
          <b-row class="d-flex justify-content-center">
            <b-col lg="4">
              <b-card-img
                :src="movie.poster || vazio.poster"
                v-if="movie.poster ? movie.poster : vazio.poster"
                class="rounded-0"
              ></b-card-img>
            </b-col>
            <b-col lg="7">
              <b-card-body
                class="d-flex flex-column-reverse h-100 pb-0 card-body"
              >
                <div>
                  <b-card-title
                    v-if="movie.title ? movie.title : vazio.title"
                    >{{ movie.title || vazio.title }}</b-card-title
                  >
                  <b-card-subtitle>Duração: {{ movie.time }}</b-card-subtitle>
                  <div class="d-flex">
                    <star-rating v-model="movie.imdb.rating" />
                  </div>
                  <router-link
                    :to="{ path: `/home/movieLocation/${movie._id}` }"
                  >
                    <b-button size="lg" class="w-75 btn-movie">
                      Ver cinemas
                    </b-button>
                  </router-link>
                </div>
              </b-card-body>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
    <div class="pt-5 d-flex justify-content-end">
      <pagination
        class="paginationTT"
        v-model="currentPage"
        :per-page="perPage"
        :rows="rows"
      ></pagination>
    </div>
  </b-container>
</template>
<script lang="ts">
import pagination from '@/components/Pagination/PaginationPage.vue';
import { defineComponent } from 'vue';
import StarRating from '../../components/Rating/StarRating.vue';

export default defineComponent({
  components: {
    pagination,
    StarRating,
  },
  data() {
    return {
      perPage: 8,
      currentPage: 1,
      vazio: {
        poster: '/img/empty-img.png',
        title: 'Filme sem titulo',
      },
      movies: [],
      // movies: [
      //   {
      //     id: 1,
      //     poster:
      //       'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcR3hrCpnlQnzqbNGvUd03l72l7JM6C5GOoHvMnhsUBldIgBs7GD',
      //     title: 'Não! Não Olhe!',
      //     time: '2h5min',
      //     imdb: 4.5,
      //   },
      //   {
      //     id: 2,
      //     poster: '',
      //     title: 'TICKET to PARADISE',
      //     time: '2h5min',
      //     imdb: 3.5,
      //   },
      //   {
      //     id: 3,
      //     poster:
      //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLnv5c0wq18JR5YRrFI6CC_B9kB5Zqz461ZqK-LyzR6-9RiE_W',
      //     title: '',
      //     time: '2h5min',
      //     imdb: 5,
      //   },
      //   {
      //     id: 4,
      //     poster:
      //       'https://br.web.img3.acsta.net/c_310_420/pictures/21/11/08/16/02/3963914.png',
      //     title: 'Homem Aranha: sem volta pra casa',
      //     time: '2h5min',
      //     imdb: 4.7,
      //   },
      //   {
      //     id: 5,
      //     poster:
      //       'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSp-lzoeSCvEzSiLDBiaeBprFOMjlry4SdUot2GfS8inDd-BoyX',
      //     title: 'Parasita',
      //     time: '2h5min',
      //     imdb: 3.7,
      //   },
      //   {
      //     id: 6,
      //     poster:
      //       'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSGXk4wQrBRtCQheTNJ6L9LgQJLsJiJ76eMNlZpeTtGTJuJK3Q3',
      //     title: 'Jurassic World: Domínio',
      //     time: '2h5min',
      //     imdb: 4,
      //   },
      //   {
      //     id: 7,
      //     poster:
      //       'https://upload.wikimedia.org/wikipedia/pt/thumb/0/08/Thor_Love_and_Thunder_poster.jpg/250px-Thor_Love_and_Thunder_poster.jpg',
      //     title: 'Thor Amor e Trovão',
      //     time: '2h5min',
      //     imdb: 3,
      //   },
      //   {
      //     id: 8,
      //     poster:
      //       'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRY5QGNRfsGSClplqEptKo2HybJwUN8wspofcJvaY-eq8vteUka',
      //     title: 'The Batman',
      //     time: '2h5min',
      //     imdb: 4.7,
      //   },
      //   {
      //     id: 9,
      //     poster:
      //       'https://sm.ign.com/ign_br/movie/t/top-gun-ma/top-gun-maverick_5w3e.jpg',
      //     title: 'top gun: maverick críticas',
      //     time: '2h10min',
      //     imdb: 4.9,
      //   },
      //   {
      //     id: 10,
      //     poster:
      //       'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQqGaPJIo-hYffWgLDcpZ68U0e6uHdHncqwEvTFgmXYIasfL10r',
      //     title: 'Bullet Train',
      //     time: '2h6m',
      //     imdb: 4.4,
      //   },
      // ],
    };
  },
  computed: {
    rows() {
      return this.$store.state.Movies.Movies.numberOfElements;
    },
    itemsForList() {
      return this.$store.state.Movies.Movies.content.slice(
        (this.currentPage - 1) * this.perPage,
        this.currentPage * this.perPage,
      );
    },
  },
  methods: {
    getRequestParams(page: Number, limit: Number) {
      const params = {};
    },
  },
  mounted() {
    this.$store.dispatch('Movies/getMovieFilter');
  },
});
</script>
<style lang="scss" scoped></style>
