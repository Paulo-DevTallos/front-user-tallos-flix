<template>
  <div>navbar</div>
  <div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'defaultLayout',
});
</script>

<style scoped>
</style>