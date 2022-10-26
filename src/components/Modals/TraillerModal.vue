<template>
  <div class="window-modal" @click="$emit('closeWindow')">
    <div class="iframe-content">
      <iframe
        :src="trailer_file"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  // url do trailer https://www.youtube.com/embed/faz9v2O-zGA
  name: 'TrallerModal',
  emits: ['closeWindow'],
  props: {
    trailer_file: { type: String },
  },
});
</script>

<style lang="scss" scoped></style>
