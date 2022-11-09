<template>
  <b-form-textarea
    no-resize
    :plaintext="data_reply_id"
    rows="rows"
    max-rows="max_rows"
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
  },
});
</script>

<!--<b-form-textarea
  class="comment-text"
  no-resize
  :plaintext="
    (editComment && teste !== reply._id) ||
    (!editComment && teste !== reply._id)
  "
  rows="3"
  max-rows="8"
  v-model:model-value="reply.text"
></b-form-textarea>

<b-form-textarea
  class="comment-text"
  no-resize
  :plaintext="
    (editComment && teste !== comment._id) ||
    (!editComment && teste !== comment._id)
  "
  rows="3"
  max-rows="4"
  v-model:model-value="comment.text"
>
</b-form-textarea>-->