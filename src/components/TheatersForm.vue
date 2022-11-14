<template>
  <div class="theaters-form-container">
    <p class="plot-title mt-4">Cinemas</p>
    <hr class="orange-line-separator" />
    <p class="form-theater-title mt-4">Localização:</p>
    <div class="w-100 mb-4 d-flex gap-3 h-100 box-form">
      <div class="location-input rounded-3 px-2 py-2 d-flex">
        <input
          type="text"
          placeholder="Digite aqui sua localização"
          v-model="this.theaterCity"
        />
        <Icon icon="carbon:location" class="iconLocation" />
      </div>
      <div class="container-btn-gps">
        <button @click="SearchCity" class="localization-button rounded px-3">
          Buscar
        </button>
        <p class="ou">ou</p>
        <button
          @click="realTimeLocalization"
          class="localization-button rounded px-3"
        >
          Ativar sua localização
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { Icon } from '@iconify/vue';

export default defineComponent({
  name: 'TheaterForm',
  components: {
    Icon,
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
    SearchCity() {
      this.$store.dispatch('Theaters/getTheatersByCity', this.theaterCity);
    },
  },
  data() {
    return {
      theaterCity: '',
    };
  },
});
</script>
