<template>
  <b-container class="pt-5 pb-5" fluid>
    <b-row cols="1" cols-sm="2" cols-md="2" cols-lg="2">
      <b-col
        v-for="movie in itemsForList"
        :key="movie.id"
        col
        no-gutters
        class="mt-5"
      >
        <b-card no-body class="overflow-hidden">
          <b-row class="d-flex justify-content-center">
            <b-col lg="4">
              <b-card-img :src="movie.poster" class="rounded-0"></b-card-img>
            </b-col>
            <b-col lg="7">
              <b-card-body
                class="d-flex flex-column-reverse h-100 pb-0 card-body"
              >
                <div>
                  <b-card-title>{{ movie.title }}</b-card-title>
                  <b-card-subtitle>Duração: {{ movie.time }}</b-card-subtitle>
                  <div class="rating">
                    <star-rating
                      class="mb-4 p-0 m-0"
                      disableClick="false"
                      :showControl="false"
                      :numberOfStars="5"
                      starSize="20"
                      starColor="#FFD84E"
                      inactiveColor="#D9D9D9"
                      v-model="movie.imdb"
                    ></star-rating>
                  </div>
                  <b-button size="lg" class="w-75 btn-movie"
                    >Ver cinemas</b-button
                  >
                </div>
              </b-card-body>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
    <div class="pt-5">
      <b-pagination
        size="lg"
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        align="center"
      ></b-pagination>
    </div>
  </b-container>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      perPage: 3,
      currentPage: 1,
      movies: [
        {
          id: 1,
          poster:
            'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcR3hrCpnlQnzqbNGvUd03l72l7JM6C5GOoHvMnhsUBldIgBs7GD',
          title: 'Não! Não Olhe!',
          time: '2h5min',
          imdb: 4.5,
        },
        {
          id: 2,
          poster:
            'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSBKMx2u2RPY-FyJ_Al7C1oA7TqteTz9SK3RxR9w8LKAafIXIBx',
          title: 'TICKET to PARADISE',
          time: '2h5min',
          imdb: 3.5,
        },
        {
          id: 3,
          poster:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLnv5c0wq18JR5YRrFI6CC_B9kB5Zqz461ZqK-LyzR6-9RiE_W',
          title: 'Minions the rise of gru',
          time: '2h5min',
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
      ],
    };
  },
  computed: {
    rows() {
      return this.movies.length;
    },
    itemsForList() {
      return this.movies.slice(
        (this.currentPage - 1) * this.perPage,
        this.currentPage * this.perPage,
      );
    },
  },
});
</script>
<style lang="scss" scoped></style>
