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
  <navbar-app />
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import NavbarApp from '../Navbar/NavbarApp.vue';

export default defineComponent({
  components: { NavbarApp },
  methods: {
    redirect() {
      this.$router.push({ name: 'home' });
    },
  },
});
</script>

<style lang="scss" scoped></style>
