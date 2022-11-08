<template>
  <star-rating
    class="mb-4 p-0 m-0"
    :disableClick="true"
    :showControl="showControl"
    :numberOfStars="5"
    starSize="20"
    starColor="#FFD84E"
    inactiveColor="#D9D9D9"
    controlBg="#ffffff00"
    controlColor="#fff"
    v-model="data"
  ></star-rating>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    ratingRawValue: { type: Number, default: 2 },
    showControl: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      data: this.ratingRawValue / 2,
    };
  },
});
</script>

<style lang="scss" scoped></style>
