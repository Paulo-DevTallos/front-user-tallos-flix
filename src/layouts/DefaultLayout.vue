<template>
  <header-app />
  <div class="layout-container">
    <navbar-app />
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import NavbarApp from '@/components/Navbar/NavbarApp.vue';
import { defineComponent } from 'vue';
import HeaderApp from '../components/Header/HeaderApp.vue';
export default defineComponent({
  name: 'defaultLayout',
  components: {
    NavbarApp,
    HeaderApp,
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
