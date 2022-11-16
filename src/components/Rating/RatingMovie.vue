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
      newRateUser: {
        rate: 0,
        user_id: this.$store.state.Users.UserId,
      },
    };
  },
  mounted() {
    this.getRatingMovie();
  },
  methods: {
    getRatingMovie() {
      ServiceGetRatingMovie.getAllRatingsMovie(this.rating.movie_id).then(
        (result) => {
          this.ratingMovie = result.data;
          console.log(this.ratingMovie);
        },
      );
    },
    saveRating() {
      if (this.ratingMovie >= [0]) {
        console.log(' existe avaliação ');
        (this.newRateUser.rate = this.rating.allRate.rate),
          this.$store.dispatch('Ratings/updateRatingUser', {
            id: this.$store.state.Movies.currentMovie._id,
            newRate: this.newRateUser,
          });
      } else if (this.ratingMovie <= []) {
        console.log(' não existe avaliação ');
        this.$store.dispatch('Ratings/createRatingsMovie', this.rating);
        this.getRatingMovie();
      }
    },
  },
});
</script>
<style lang="scss" scoped></style>
