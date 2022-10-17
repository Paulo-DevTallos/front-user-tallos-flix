<template>
  <span @click="$emit('toggle')">
    <Icon icon="carbon:view" id="view-icon" v-if="isPassword" />
    <Icon icon="carbon:view-off" id="view-icon" v-else />
  </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Icon } from '@iconify/vue';

export default defineComponent({
  name: 'RevelingPassword',
  emits: ['toggle'],
  props: {
    isPassword: { type: Boolean },
  },
  components: {
    Icon,
  },
});
</script>
