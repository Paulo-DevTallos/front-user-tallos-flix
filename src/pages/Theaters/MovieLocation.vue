<template>
  <div class="">
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
      <comments-movie />
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
  components: { CardMovie, PlotView, TheatersForm, MapView, TheatersList, CommentsMovie },
});
</script>

<style lang="scss" scoped>
.comments-app {
width: 85%;
}
</style>
