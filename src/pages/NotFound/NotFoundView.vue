<template>
  <div class="erro-field-container">
    <header-app />
    <div class="template-container">
      <div class="container-error mt-4">
        <h2>Erro 404 pagina não encontrada</h2>
        <img src="/img/cuate.png" alt="imagem de erro" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import HeaderApp from '@/components/Header/HeaderApp.vue';

export default defineComponent({
  components: {
    HeaderApp,
  },
});
</script>
<style lang="scss">
.erro-field-container{
    background-color: #3f3f3f;
}
</style>
