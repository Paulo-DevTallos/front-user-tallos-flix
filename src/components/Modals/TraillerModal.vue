<template>
  <div class="window-modal" @click="$emit('closeWindow')">
    <div class="iframe-content">
      <Icon icon="eva:close-fill" @click="$emit('closeWindow')"/>
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
import { Icon } from '@iconify/vue';

export default defineComponent({
  name: 'TrallerModal',
  components: { Icon },
  emits: ['closeWindow'],
  props: {
    trailer_file: { type: String },
  },
});
</script>

<style lang="scss" scoped></style>
