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
        @redirect="redirectToLogin"
        @postComment="commentPost"
        :viewMore="pageChange"
        class="comments-comp"
      />
      <OptionsModal v-if="hiddenOptionModal" @closeWindow="closeOptionModal" :action="message" />
    </div>
  </div>
</template>

<script lang="ts">
import CardMovie from '@/components/Cards/CardMovie.vue';
import CommentsMovie from '@/components/Comments/CommentsMovie.vue';
import MapView from '@/components/Map.vue';
import OptionsModal from '@/components/Modals/OptionsModal.vue';
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
    OptionsModal,
  },
  data() {
    return {
      message: 'adicionar comentário',
      limit: 5,
      isLogged: localStorage.getItem('token'),
      hiddenOptionModal: false,
      movie: {
        movie: this.$store.state.Movies.currentMovie._id,
      },
    };
  },
  methods: {
    redirectToLogin(): void {
      if (!this.isLogged) {
        this.hiddenOptionModal = true;
      } else {
        this.commentsRender();
      }
    },
    closeOptionModal() {
      this.hiddenOptionModal = false;
    },
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

      const cleanInputComment = (userComent.text = '');

      return cleanInputComment;
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
