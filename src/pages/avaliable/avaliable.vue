<template>
  <div class="container-fv">
    <header-app />
    <b-container class="pt-5 favorite-container">
      <div class="pb-2">
        <h3 class="title">Minhas Avaliações</h3>
      </div>
    </b-container>
  </div>
</template>
<script lang="ts">
import HeaderApp from '@/components/Header/HeaderApp.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: { HeaderApp },
  mounted() {
    
  }
});
</script>
