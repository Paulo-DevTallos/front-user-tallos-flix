<template>
  <div class="container-fv">
    <header-app />
    <b-container class="pt-5 favorite-container">
      <div class="pb-2">
        <h3 class="title">Minhas Avaliações</h3>
      </div>
    </b-container>
  </div>
</template>
<script lang="ts">
import HeaderApp from '@/components/Header/HeaderApp.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: { HeaderApp },
  mounted() {
    console.log(this.$store.state.Ratings.RatingsUser);
    this.$store.dispatch(
      'Ratings/getAllRatingsUser',
      this.$store.state.Users.UserId,
    );
    for (
      let index = 0;
      index < this.$store.state.Ratings.RatingsUser.length;
      index++
    ) {
      this.$store.dispatch(
        'Movies/getMovieFilterId',
        this.$store.state.Ratings.RatingsUser[index].movie_id,
      );
    }
  },
});
</script>
