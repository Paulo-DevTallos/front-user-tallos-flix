<template>
  <div class="page-container">
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
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CardMovie from '@/components/Cards/CardMovie.vue';
import PlotView from '@/components/Plot.vue';
import TheatersForm from '@/components/TheatersForm.vue';
import MapView from '@/components/Map.vue';
import TheatersList from '@/components/TheatersList.vue';
export default defineComponent({
  name: 'LocationView',
  components: { CardMovie, PlotView, TheatersForm, MapView, TheatersList },
  mounted() {
    window.navigator.geolocation.getCurrentPosition((postion) => {
      const coords = {
        lat: postion.coords.latitude,
        long: postion.coords.longitude,
      };
      this.$store.dispatch('Theaters/getTheatersBylocation', coords);
    }, console.log);
  },
});
</script>

<style lang="scss" scoped></style>
