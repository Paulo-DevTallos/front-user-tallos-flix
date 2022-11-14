<template>
  <b-form-textarea
    no-resize
    :plaintext="data_reply_id"
    rows="rows"
    max-rows="max_rows"
    maxLenght="max_lenght"
  ></b-form-textarea>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TextAreaField',
  props: {
    data_reply_id: {
      type: Boolean,
    },
    rows: {
      type: Number,
    },
    max_rows: {
      type: Number,
    },
    max_lenght: {
      type: Number,
    },
  },
});
</script>
