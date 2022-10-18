<template>
  <header class="conteudo-header">
    <b-img
      class="img-header"
      center
      fluid
      src="../../../public/img/logo-tallos.png"
      @click="redirect"
    ></b-img>
  </header>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  methods: {
    redirect() {
      this.$router.push({ name: 'home' });
    },
  },
});
</script>

<style lang="scss" scoped></style>
