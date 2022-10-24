<template>
  <div class="container-error">
    <h2 v-pre>Não encontramos filmes com a palavra {{ palavra }}</h2><!--lembrar de remover o v-prev-->
    <img src="img/cuate.png" alt="imagem de erro" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ErrorComponent',
});
</script>

<style lang="scss" scoped></style>
