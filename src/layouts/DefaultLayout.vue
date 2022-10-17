<template>
  <div><navbar-app /></div>
  <div>
    <router-view></router-view>
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

<style scoped></style>
