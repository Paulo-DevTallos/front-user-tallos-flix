<template>
  <div class="page-container">
    <CardMovie />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CardMovie from '@/components/Cards/CardMovie.vue';

export default defineComponent({
  name: 'MovieView',
  components: { CardMovie },
});
</script>

<style lang="scss" scoped></style>
