<template>
  <div class="window-modal" @click="$emit('closeWindow')">
    <div class="iframe-content">
      <iframe src="https://www.youtube.com/embed/faz9v2O-zGA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TrallerModal',
  emits: ['closeWindow'],
});
</script>

<style lang="scss" scoped></style>
