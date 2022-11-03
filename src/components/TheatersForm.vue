<template>
  <div class="theaters-form-container">
    <p class="plot-title mt-4">Cinemas</p>
    <hr class="orange-line-separator" />
    <p class="form-theater-title mt-4">Localização:</p>
    <div class="w-100 mb-4 d-flex gap-3">
      <LocationInput class="w-50" />
      <button
        @click="realTimeLocalization"
        id="localization-button"
        class="rounded px-3"
      >
        Ativar sua localização
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import LocationInput from '@/components/LocationInput.vue';

export default defineComponent({
  name: 'TheaterForm',
  components: {
    LocationInput,
  },
  methods: {
    realTimeLocalization() {
      window.navigator.geolocation.getCurrentPosition((postion) => {
        const coords = {
          lat: postion.coords.latitude,
          long: postion.coords.longitude,
        };
        this.$store.state.Theaters.UserCoords = [coords.lat, coords.long];
        this.$store.dispatch('Theaters/getTheatersBylocation', coords);
      }, console.log);
    },
  },
});
</script>
<style lang="scss" scoped>
#localization-button {
  color: white;
  background-color: #d36643;
  border: none;
  &:hover{
    filter: brightness(1.2);
  }
}
</style>
