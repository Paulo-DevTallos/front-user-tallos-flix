<template>
  <div class="page-container">
    {{ this.$store.state.Movies.Movies.content[0].title }}
    <CardMovie />
    <dir>
      <PlotView />
      <TheatersForm />
    </dir>
    <div class="map-location-field px-5 py-4">
      <MapView />
    </div>
    <div class="ps-5">
      <TheatersList />
    </div>
    <div class="ps-5 comments-app">
      <p class="plot-title mt-4">Comentários</p>
      <hr class="orange-line-separator" />
      <comments-movie class="comments-comp" />
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
  mounted() {
    window.navigator.geolocation.getCurrentPosition((postion) => {
      const coords = {
        lat: postion.coords.latitude,
        long: postion.coords.longitude,
      };
      this.$store.dispatch('Theaters/getTheatersBylocation', coords);
    }, console.log);
    this.$store.dispatch('Movies/getMovieFilter', {
      field: 'title',
      search: '!Women Art Revolution',
    });
  },
});
</script>

<style lang="scss" scoped></style>
