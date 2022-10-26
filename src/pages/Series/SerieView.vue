<template>
  <div class="page-container">
    <CardMovie :hiddenBtnTrailer="false" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CardMovie from '@/components/Cards/CardMovie.vue';

export default defineComponent({
  name: 'SerieView',
  components: { CardMovie },
});
</script>
