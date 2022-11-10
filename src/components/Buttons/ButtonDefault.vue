<template>
  <b-button size="lg" class="btn-comment" @click="$emit('btnAction')">
    {{ data_btn_title }}
  </b-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ButtonDefault',
  emits: ['btnAction'],
  props: {
    data_btn_title: {
      type: String,
    },
  },
});
</script>
