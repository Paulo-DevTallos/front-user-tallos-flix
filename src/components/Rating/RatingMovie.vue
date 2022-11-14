<template>
  <div class="theaters-form-container">
    <p class="plot-title ps-5 mt-4">Avalie este Filme</p>
    <hr class="orange-line-separator" />
    <div class="d-flex flex-column align-items-center">
      <p class="avaliationTitle m-2">Avaliação</p>
      <div class="d-flex">
        <star-rating v-model="rating.allRate[0].rate" :showControl="true" />
      </div>
      <div>
        <button-default
          class="BtnSalvar"
          :data_btn_title="'Salvar'"
          @btnAction="SaveRating"
          :disabled="rating.allRate[0].rate === 0"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import ButtonDefault from '../Buttons/ButtonDefault.vue';
import StarRating from './StarRating.vue';

export default defineComponent({
  components: { StarRating, ButtonDefault },
  data() {
    return {
      rating: {
        movie_id: this.$store.state.Movies.currentMovie._id,
        allRate: [
          {
            rate: 0,
            user_id: this.$store.state.Users.UserId,
          },
        ],
      },
    };
  },
  methods: {
    SaveRating() {
      this.$store.dispatch(
        'Ratings/getAllRatingsUser',
        this.$store.state.Movies.currentMovie._id,
      );
      for (
        let index = 0;
        index < this.$store.state.Ratings.RatingsUser.length;
        index++
      ) {
        if (this.rating.allRate[0].rate === 0) {
          console.log(' não da pra criar ');
        } else if (
          this.$store.state.Ratings.RatingsUser[index].movie_id ===
          this.$store.state.Movies.currentMovie._id
        ) {
          console.log(' Ja existe avaliação');
          // this.$store.dispatch('Ratings/createRatingsMovie', this.rating);
        }  else if (
          this.$store.state.Ratings.RatingsUser[index].movie_id !==
          this.$store.state.Movies.currentMovie._id
        ) {
          console.log(' nao existe avaliação');
        }
      }
      // console.log(this.$store.state.Ratings.RatingsUser[0].movie_id);
      // if (this.rating.allRate[0].rate === 0) {
      //   console.log(' não da pra criar ');
      // } else if (
      //   this.$store.state.Ratings.RatingsUser[0].movie_id !=
      //   this.$store.state.Movies.currentMovie._id
      // ) {
      //   console.log(' Ja existe');
      //   // this.$store.dispatch('Ratings/createRatingsMovie', this.rating);
      // }
    },
  },
});
</script>
<style lang="scss" scoped></style>
