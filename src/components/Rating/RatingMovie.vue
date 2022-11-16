<template>
  <div class="theaters-form-container">
    <p class="plot-title ps-5 mt-4">Avalie este Filme</p>
    <hr class="orange-line-separator" />
    <div class="d-flex flex-column align-items-center">
      <p class="avaliationTitle m-2">Avaliação</p>
      <div
        class="d-flex"
        v-for="ratingUser in this.$store.state.Ratings.RatingsUser"
        :key="ratingUser._id"
      >
        <div
          v-if="
            ratingUser.movie_id === this.$store.state.Movies.currentMovie._id &&
            ratingUser.allRate[0].user_id === this.$store.state.Users.UserId
          "
        >
          <star-rating
            v-model="ratingUser.allRate[0].rate"
            :showControl="true"
          />
        </div>
      </div>
      <div v-if="ratingMovie <= []">
        <star-rating v-model="rating.allRate.rate" :showControl="true" />
      </div>
      <div
        v-for="ratingUser in this.$store.state.Ratings.RatingsUser"
        :key="ratingUser._id"
      >
        <div
          v-if="
            ratingUser.movie_id === this.$store.state.Movies.currentMovie._id &&
            ratingUser.allRate[0].user_id === this.$store.state.Users.UserId
          "
        >
          <button-default
            class="BtnSalvar"
            :data_btn_title="'Salvar'"
            @btnAction="saveRating(ratingUser)"
            :disabled="ratingUser.allRate[0].rate === 0"
          />
        </div>
      </div>
      <div v-if="ratingMovie <= []">
        <button-default
          class="BtnSalvar"
          :data_btn_title="'Salvar'"
          @btnAction="saveRating"
          :disabled="rating.allRate.rate === 0"
        />
      </div>
      <!-- <div v-if="!viewRating">
        <button-default
          class="BtnSalvar"
          :data_btn_title="'Salvar'"
          @btnAction="saveRating"
          :disabled="rating.allRate.rate === 0"
        />
      </div> -->
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
      viewRating: true,
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
    this.getRatingUser();
  },
  methods: {
    getRatingUser() {
      this.$store.dispatch(
        'Ratings/getAllRatingsUser',
        this.$store.state.Users.UserId,
      );
      console.log(this.$store.state.Ratings.RatingsUser);
    },
    getRatingMovie() {
      ServiceGetRatingMovie.getAllRatingsMovie(this.rating.movie_id).then(
        (result) => {
          this.ratingMovie = result.data;
          console.log(this.ratingMovie);
        },
      );
    },
    async saveRating(ratingUser) {
      if (this.ratingMovie >= [0]) {
        console.log(' existe avaliação ');
        (this.newRateUser.rate = ratingUser.allRate[0].rate),
          await this.$store.dispatch('Ratings/updateRatingUser', {
            id: this.$store.state.Movies.currentMovie._id,
            newRate: this.newRateUser,
          });
        this.getRatingMovie();
      } else if (this.ratingMovie <= []) {
        console.log(' não existe avaliação ');
        await this.$store.dispatch('Ratings/createRatingsMovie', this.rating);
        this.getRatingMovie();
        this.getRatingUser();
      }
    },
  },
});
</script>
<style lang="scss" scoped></style>
