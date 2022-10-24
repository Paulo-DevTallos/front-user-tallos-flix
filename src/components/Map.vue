<template>
  <l-map ref="map" :zoom="2" :center="[51.505, -0.159]" class="map">
    <l-tile-layer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution="'&copy; <a target='_blank' href='http://osm.org/copyright'>OpenStreetMap</a> contributors'"
      layer-type="base"
      name="OpenStreetMap"
      :min-zoom="1"
      :max-zoom="26"
    ></l-tile-layer>
    <div
      v-for="Theater in this.$store.state.Theaters.NearTheaters"
      :key="Theater.theaterId"
    >
      <l-marker :lat-lng="Theater.location.geo.coordinates">
        <l-icon
          :icon-size="[20, 20]"
          icon-url="http://localhost:8085/img/bxs_camera-movie.png"
        />
      </l-marker>
    </div>
  </l-map>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import 'leaflet/dist/leaflet.css';
import LMap from '@vue-leaflet/vue-leaflet/src/components/LMap.vue';
import LTileLayer from '@vue-leaflet/vue-leaflet/src/components/LTileLayer.vue';
import LMarker from '@vue-leaflet/vue-leaflet/src/components/LMarker.vue';
import LIcon from '@vue-leaflet/vue-leaflet/src/components/LIcon.vue';
export default defineComponent({
  name: 'Map-View',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LIcon,
  },
});
</script>
<style lang="scss" scoped></style>
