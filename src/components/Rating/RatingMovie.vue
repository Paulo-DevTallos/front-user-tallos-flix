<template>
  <div class="theaters-form-container">
    <p class="plot-title ps-5 mt-4">Avalie este Filme</p>
    <hr class="orange-line-separator" />
    <div class="d-flex flex-column align-items-center">
      <p class="avaliationTitle m-2">Avaliação</p>
      <div v-if="!ValidateComponent">
        <div
          class="d-flex"
          v-for="ratingUser in ratingMovie?.[0].allRate"
          :key="ratingUser._id"
        >
          <star-rating
            v-if="ratingUser.user_id === this.$store.state.Users.UserId"
            v-model="ratingUser.rate"
            :showControl="true"
          />
        </div>
        <div
          class="d-flex justify-content-center"
          v-for="ratingUser in ratingMovie?.[0].allRate"
          :key="ratingUser._id"
        >
          <button-default
            v-if="ratingUser.user_id === this.$store.state.Users.UserId"
            class="BtnSalvar"
            :data_btn_title="'Salvar'"
            @btnAction="saveRating(ratingUser.rate)"
            :disabled="ratingUser.rate === 0"
          />
        </div>
      </div>
      <star-rating
        v-if="ValidateComponent"
        v-model="rating.allRate.rate"
        :showControl="true"
      />
      <div>
        <button-default
          v-if="ValidateComponent"
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
      ratingMovie: [
        {
          allRate: [
            {
              rate: 0,
              user_id: '',
            },
          ],
        },
      ],
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
      ValidateRating: false,
      ValidateComponent: true,
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
      console.log(this.$store.state.Ratings.RatingsUser);
    },
    async getRatingMovie() {
      await ServiceGetRatingMovie.getAllRatingsMovie(this.rating.movie_id).then(
        (result) => {
          this.ratingMovie = result.data;
          console.log(this.ratingMovie);
        },
      );
      for (let index = 0; index < this.ratingMovie[0].allRate.length; index++) {
        if (
          this.ratingMovie[0].allRate[index].user_id ===
          this.$store.state.Users.UserId
        ) {
          console.log('avaliou');
          this.ValidateComponent = false;
        }
      }
    },
    async saveRating(userRate: number) {
      if (this.ratingMovie <= []) {
        console.log('criar primeira avaliação do filme');
        await this.$store.dispatch('Ratings/createRatingsMovie', this.rating);
        this.getRatingsUser();
        this.getRatingMovie();
      } else if (this.ratingMovie >= []) {
        for (
          let index = 0;
          index < this.ratingMovie[0].allRate.length;
          index++
        ) {
          if (
            this.ratingMovie[0].allRate[index].user_id ===
            this.$store.state.Users.UserId
          ) {
            console.log('esse filme foi avaliado por este usuario');
            this.ValidateRating = true;
            (this.newRateUser.rate = userRate),
              await this.$store.dispatch('Ratings/updateRatingUser', {
                id: this.$store.state.Movies.currentMovie._id,
                newRate: this.newRateUser,
              });
            this.getRatingsUser();
            this.getRatingMovie();
          }
        }
        if (this.ValidateRating === false) {
          console.log('filme com avaliação, mas o usuario logado nao tem');
          await this.$store.dispatch('Ratings/createRatingsMovie', this.rating);
          this.getRatingsUser();
          this.getRatingMovie();
        }
      }
    },
  },
});
</script>
