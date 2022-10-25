<template>
  <b-pagination
    pills
    :total-rows="rows"
    :per-page="perPage"
    @change="teste"
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
    teste: {
      type: Function,
      required: false,
    }
  },
});
</script>
<style lang="scss" scoped></style>
