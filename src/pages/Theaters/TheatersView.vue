<template>
  <b-container class="pt-5" fluid>
    <b-row cols="1" cols-sm="2" cols-md="2" cols-lg="2">
      <b-col v-for="movie in movies" :key="movie" col no-gutters class="mb-2">
        <b-card no-body class="overflow-hidden" border-variant="none">
          <b-row>
            <b-col lg="4">
              <b-card-img :src="movie.poster" class="rounded-0"></b-card-img>
            </b-col>
            <b-col lg="7">
              <b-card-body>
                <div>
                  <b-card-title>{{ movie.title }}</b-card-title>
                  <b-card-subtitle>Duração: {{ movie.time }}</b-card-subtitle>
                  <b-form-rating></b-form-rating>
                  <b-button size="lg">Ver cinemas</b-button>
                </div>
              </b-card-body>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      movies: [
        {
          poster:
            'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcR3hrCpnlQnzqbNGvUd03l72l7JM6C5GOoHvMnhsUBldIgBs7GD',
          title: 'Não! Não Olhe!',
          time: '2h5min',
          imdb: 10,
        },
        {
          poster:
            'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSBKMx2u2RPY-FyJ_Al7C1oA7TqteTz9SK3RxR9w8LKAafIXIBx',
          title: 'TICKET to PARADISE',
          time: '2h5min',
          imdb: 8.5,
        },
        {
          poster:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLnv5c0wq18JR5YRrFI6CC_B9kB5Zqz461ZqK-LyzR6-9RiE_W',
          title: 'Minions the rise of gru',
          time: '2h5min',
          imdb: 7,
        },
        {
          poster:
            'https://br.web.img3.acsta.net/c_310_420/pictures/21/11/08/16/02/3963914.png',
          title: 'Homem Aranha: sem volta pra casa',
          time: '2h5min',
          imdb: 9,
        },
        { poster: '', title: 'Não! Não Olhe!', time: '2h5min', imdb: 5.7 },
        { poster: '', title: 'Não! Não Olhe!', time: '2h5min', imdb: 5.7 },
      ],
    };
  },
});
</script>
<style scoped>
.card-img {
  width: 100%;
  height: 250px;
}
.card {
  background-color: rgba(255, 255, 255, 0);
}
.card-title {
  color: white;
}
.text-muted {
  color: white !important;
}
</style>
