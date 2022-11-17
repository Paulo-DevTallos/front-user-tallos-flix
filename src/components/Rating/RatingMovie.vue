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
    this.getRatingsUser();
    this.getRatingMovie();
  },
  methods: {
    getRatingsUser() {
      this.$store.dispatch(
        'Ratings/getAllRatingsUser',
        this.$store.state.Users.UserId,
      );
    },
    getRatingMovie() {
      ServiceGetRatingMovie.getAllRatingsMovie(this.rating.movie_id).then(
        (result) => {
          this.ratingMovie = result.data;
          console.log(this.ratingMovie[0].allRate.length);
        },
      );
    },
    saveRating() {
      for (let index = 0; index < this.ratingMovie[0].allRate.length; index++) {
        if (
          this.ratingMovie[0].allRate[index].user_id ===
          this.$store.state.Users.UserId
        ) {
          console.log('esse filme foi avaliado por este usuario');
        } else if (this.ratingMovie[0].allRate[index].user_id !=
          this.$store.state.Users.UserId) {
            console.log(" usuario não avaliou este filme, criar");
          }
      }
    },
  },
});
</script>
