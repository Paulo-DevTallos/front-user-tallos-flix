<template>
  <img :src="source_data" size="5rem" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AvatarView',
  props: {
    source_data: {
      type: String,
    },
  },
});
</script>
