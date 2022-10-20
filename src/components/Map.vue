<template>
  <l-map ref="map" :zoom="2" :center="[51.505, -0.159]" class="map">
    <l-tile-layer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution="'&copy; <a target='_blank' href='http://osm.org/copyright'>OpenStreetMap</a> contributors'"
      layer-type="base"
      name="OpenStreetMap"
      :min-zoom="1"
      :max-zoom="20"
    ></l-tile-layer>
  </l-map>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import 'leaflet/dist/leaflet.css';
import LMap from '@vue-leaflet/vue-leaflet/src/components/LMap.vue';
import LTileLayer from '@vue-leaflet/vue-leaflet/src/components/LTileLayer.vue';
export default defineComponent({
  name: 'Map-View',
  components: {
    LMap,
    LTileLayer,
  },
});
</script>
<style lang="scss" scoped></style>
