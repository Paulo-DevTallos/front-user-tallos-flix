<template>
  <b-avatar :src="source_data" size="5rem"></b-avatar>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AvatarView',
  props: {
    source_data: {
      type: Boolean,
    },
  },
});
</script>
