<template>
  <div class="corpo-fv">
    <header-app />
    <b-container class="pt-5 favorite-container">
      <div class="pb-2">
        <h3>Meus favoritos</h3>
      </div>
      <b-row
        v-for="favorite in itemsForList"
        :key="favorite.id"
        col
        no-gutters
        class="mt-5 d-flex"
      >
        <b-col cols="1">
          <div class="h-100 d-flex justify-content-center align-items-center">
            <Icon icon="carbon:delete" class="icon-delete" />
          </div>
        </b-col>
        <b-col cols="5">
          <b-row>
            <b-col cols="4">
              <b-card-img
                :src="favorite.poster || vazio.poster"
                v-if="favorite.poster ? favorite.poster : vazio.poster"
                class="rounded-0"
              ></b-card-img>
            </b-col>
            <b-col cols="7">
              <b-card-body>
                <b-card-title
                  class="text-color pb-2"
                  v-if="favorite.title ? favorite.title : vazio.title"
                  >{{ favorite.title || vazio.title }}</b-card-title
                >
              </b-card-body>
              <b-card-subtitle class="text-color"
                >Duração: {{ favorite.time }}</b-card-subtitle
              >
              <div class="d-flex">
                <span class="text-color pt-1">Avaliação:</span>
                <StarRating
                  class="ms-1 -flex"
                  v-model="favorite.imdb"
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
              v-if="favorite.plot ? favorite.plot : vazio.plot"
            >
              {{ favorite.plot || vazio.plot }}</b-form-text-area
            >
            <div>
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
      favorites: [
        {
          id: 1,
          poster:
            'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcR3hrCpnlQnzqbNGvUd03l72l7JM6C5GOoHvMnhsUBldIgBs7GD',
          title: 'Não! Não Olhe!',
          plot: "No exuberante mundo alienígena de Pandora vivem os Na'vi, seres que parecem ser primitivos, mas são altamente evoluídos. Como o ambiente do planeta é tóxico, foram criados os avatares, corpos biológicos controlados pela ente humana....",
          time: '2h5min',
          imdb: 4.5,
        },
        {
          id: 2,
          poster: '',
          title: 'TICKET to PARADISE',
          time: '2h5min',
          plot: '',
          imdb: 3.5,
        },
        {
          id: 3,
          poster:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLnv5c0wq18JR5YRrFI6CC_B9kB5Zqz461ZqK-LyzR6-9RiE_W',
          title: '',
          time: '2h5min',
          plot: 'Seres amarelos milenares, os minions têm uma missão: servir aos maiores vilões. Em depressão desde a morte de seu antigo mestre, eles tentam encontrar um novo chefe. ',
          imdb: 5,
        },
        {
          id: 4,
          poster:
            'https://br.web.img3.acsta.net/c_310_420/pictures/21/11/08/16/02/3963914.png',
          title: 'Homem Aranha: sem volta pra casa',
          time: '2h5min',
          imdb: 4.7,
        },
        {
          id: 5,
          poster:
            'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSp-lzoeSCvEzSiLDBiaeBprFOMjlry4SdUot2GfS8inDd-BoyX',
          title: 'Parasita',
          time: '2h5min',
          imdb: 3.7,
        },
        {
          id: 6,
          poster:
            'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSGXk4wQrBRtCQheTNJ6L9LgQJLsJiJ76eMNlZpeTtGTJuJK3Q3',
          title: 'Jurassic World: Domínio',
          time: '2h5min',
          imdb: 4,
        },
        {
          id: 7,
          poster:
            'https://upload.wikimedia.org/wikipedia/pt/thumb/0/08/Thor_Love_and_Thunder_poster.jpg/250px-Thor_Love_and_Thunder_poster.jpg',
          title: 'Thor Amor e Trovão',
          time: '2h5min',
          imdb: 3,
        },
        {
          id: 8,
          poster:
            'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRY5QGNRfsGSClplqEptKo2HybJwUN8wspofcJvaY-eq8vteUka',
          title: 'The Batman',
          time: '2h5min',
          imdb: 4.7,
        },
        {
          id: 9,
          poster:
            'https://sm.ign.com/ign_br/movie/t/top-gun-ma/top-gun-maverick_5w3e.jpg',
          title: 'top gun: maverick críticas',
          time: '2h10min',
          imdb: 4.9,
        },
        {
          id: 10,
          poster:
            'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQqGaPJIo-hYffWgLDcpZ68U0e6uHdHncqwEvTFgmXYIasfL10r',
          title: 'Bullet Train',
          time: '2h6m',
          imdb: 4.4,
        },
      ],
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
