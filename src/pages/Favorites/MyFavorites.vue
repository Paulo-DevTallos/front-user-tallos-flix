<template>
  <div class="corpo-fv">
    <header-app />
    <div class="favorite-container">pagina de favoritos</div>
  </div>
</template>
<script lang="ts">
import HeaderApp from '@/components/Header/HeaderApp.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: { HeaderApp },
});
</script>

<style lang="scss" scoped>
</style>