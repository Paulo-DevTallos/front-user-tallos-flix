<template>
<div class="plot-container">
    <p class="plot-title mt-4">Sinopse</p>
  <hr class="orange-line-separator" />
  <div class="plot-area-text">
    <p class="plot-text">
      {{this.$store.state.Movies.currentMovie.fullplot}}
    </p>
  </div>
</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'PlotView',
});
</script>
<style lang="scss" scoped></style>
