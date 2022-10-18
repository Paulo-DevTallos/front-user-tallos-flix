<template>
  <div class="layout-container">
    <header-app />
    <div class="template-container">
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

<style scoped lang="scss"></style>
