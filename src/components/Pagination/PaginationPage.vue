<template>
  <b-pagination
    pills
    :total-rows="rows"
    :per-page="perPage"
    size="lg"
  ></b-pagination>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    rows: {
      type: Number,
      required: false,
    },
    perPage: {
      type: Number,
      required: false,
    },
  },
});
</script>