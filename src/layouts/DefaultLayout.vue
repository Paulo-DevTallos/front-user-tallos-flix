<template>
  <div class="layout-container">
    <div><navbar-app /></div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import NavbarApp from '@/components/Navbar.vue/NavbarApp.vue';
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'defaultLayout',
  components: {
    NavbarApp,
  },
});
</script>

<style scoped lang="scss">
@import '@/assets/sass/partials/_variables.scss';
.layout-container {
  background-color: $primary-color-black-bg;
  background-image: url('img/Header-Background.png');
  background-repeat: no-repeat;
  background-size: contain;
  height: 100vh;
}
</style>
