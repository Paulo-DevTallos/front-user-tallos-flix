<template>
  <div class="page-container">
    <CardMovie @traillerModal="openTraillerModal" />
    <TraillerModal />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CardMovie from '@/components/Cards/CardMovie.vue';
import TraillerModal from '@/components/Modals/TraillerModal.vue';

export default defineComponent({
  name: 'MovieView',
  components: { CardMovie, TraillerModal },
  data() {
    return {

    }
  },
  methods: {
    openTraillerModal() {
      alert('teste');
      console.log('teste');
    },
  },
});
</script>

<style lang="scss" scoped></style>
