<template>
  <div class="layout-container">
    <header-app />
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HeaderApp from '../components/Header/HeaderApp.vue';
export default defineComponent({
  name: 'defaultLayout',
  components: {
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
