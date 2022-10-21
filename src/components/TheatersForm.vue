<template>
  <div class="theaters-form-container">
    <p class="plot-title mt-4">Cinemas</p>
    <hr class="orange-line-separator" />
    <p class="form-theater-title mt-4">Localização:</p>
    <div class="w-50 mb-4">
      <LocationInput />
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
});
</script>
<style lang="scss" scoped></style>
