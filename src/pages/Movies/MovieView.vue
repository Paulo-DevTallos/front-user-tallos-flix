<template>
  <div class="page-container">
    <CardMovie @traillerModal="openTraillerModal" />
    <TraillerModal
      v-if="hiddenTraillerModal"
      @closeWindow="closeModal"
    />
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
      hiddenTraillerModal: false,
    }
  },
  methods: {
    openTraillerModal(): void {
      this.hiddenTraillerModal = true;
    },

    closeModal(): void {
      this.hiddenTraillerModal = false;
    },
  },
});
</script>

<style lang="scss" scoped></style>
