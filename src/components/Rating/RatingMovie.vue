<template>
  <div class="theaters-form-container">
    <p class="plot-title ps-5 mt-4">Avalie este Filme</p>
    <hr class="orange-line-separator" />
    <div class="d-flex flex-column align-items-center">
      <p class="avaliationTitle m-2">Avaliação</p>
      <div class="d-flex">
        <star-rating v-model="rating.allRate.rate" :showControl="true" />
      </div>
      <div>
        <button-default
          class="BtnSalvar"
          :data_btn_title="'Salvar'"
          @btnAction="saveRating"
          :disabled="rating.allRate.rate === 0"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import ButtonDefault from '../Buttons/ButtonDefault.vue';
import StarRating from './StarRating.vue';
import ServiceGetRatingMovie from '@/services/axios/RatingsRequest';

export default defineComponent({
  components: { StarRating, ButtonDefault },
  data() {
    return {
      ratingMovie: [],
      rating: {
        movie_id: this.$store.state.Movies.currentMovie._id,
        allRate: {
          rate: 0,
          user_id: this.$store.state.Users.UserId,
        },
      },
    };
  },
  mounted() {
    ServiceGetRatingMovie.getAllRatingsMovie(this.rating.movie_id).then(
      (result) => {
        this.ratingMovie = result.data;
        console.log(this.ratingMovie);
      },
    );
  },
  methods: {
    saveRating() {
      if (this.ratingMovie >= [0]) {
        console.log(' existe avaliação ');
      } else if (this.ratingMovie <= []) {
        console.log(' não existe avaliação ');
        this.$store.dispatch('Ratings/createRatingsMovie', this.rating);
      }
    },
    // SaveRating() {
    //   console.log(this.$store.state.Ratings.RatingsMovie);
    //   this.$store.dispatch(
    //     'Ratings/getAllRatingsMovie',
    //     this.$store.state.Movies.currentMovie._id,
    //   );
    //   for (
    //     let index = 0;
    //     index < this.$store.state.Ratings.RatingsMovie.length;
    //     index++
    //   ) {
    //     if (this.$store.state.Ratings.RatingsMovie >= [1]) {
    //       console.log(' Ja existe avaliação');
    //       // this.$store.dispatch('Ratings/createRatingsMovie', this.rating);
    //     } else if (this.$store.state.Ratings.RatingsMovie <= [0]) {
    //       console.log(' nao existe avaliação');
    //       this.$store.dispatch('Ratings/createRatingsMovie', this.rating);
    //     }
    //   }
    // },
  },
});
</script>
<style lang="scss" scoped></style>
