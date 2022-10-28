<template>
  <div class="page-container">
    <CardMovie :hiddenBtnTrailer="true" />
    <div>
      <PlotView />
      <TheatersForm />
    </div>
    <div class="map-location-field px-5 py-4">
      <MapView />
    </div>
    <div class="ps-5">
      <TheatersList />
    </div>
    <div class="ps-5 comments-app">
      <p class="plot-title mt-4">Comentários</p>
      <hr class="orange-line-separator" />
      <div
        class="p-4 d-flex justify-content-center plot-title"
        v-if="this.$store.state.Comments.Comments < [0]"
      >
        Nenhum comentário encontrado
      </div>
      <comments-movie
        :renderComments="this.$store.state.Comments.Comments"
        @postComment="commentPost"
        :viewMore="pageChange"
        class="comments-comp"
      />
    </div>
  </div>
</template>

<script lang="ts">
import CardMovie from '@/components/Cards/CardMovie.vue';
import CommentsMovie from '@/components/Comments/CommentsMovie.vue';
import MapView from '@/components/Map.vue';
import PlotView from '@/components/Plot.vue';
import TheatersForm from '@/components/TheatersForm.vue';
import TheatersList from '@/components/TheatersList.vue';
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'LocationView',
  components: {
    CardMovie,
    PlotView,
    TheatersForm,
    MapView,
    TheatersList,
    CommentsMovie,
  },
  data() {
    return {
      limit: 5,
      movie: {
        movie: this.$store.state.Movies.currentMovie._id,
      },
    };
  },
  methods: {
    commentsRender() {
      this.$store.dispatch('Comments/getByMovieId', {
        movie: this.movie,
        params: {
          limit: this.limit,
        },
      });
    },
    commentPost(userComent: Object) {
      console.log(userComent);
      this.$store.dispatch('Comments/createComment', userComent);
    },
    async pageChange() {
      this.limit = this.limit + 5;
      this.commentsRender();
    },
  },
  mounted() {
    window.navigator.geolocation.getCurrentPosition((postion) => {
      const coords = {
        lat: postion.coords.latitude,
        long: postion.coords.longitude,
      };
      this.$store.dispatch('Theaters/getTheatersBylocation', coords);
    }, console.log);
    this.commentsRender();
  },
});
</script>

<style lang="scss" scoped></style>
