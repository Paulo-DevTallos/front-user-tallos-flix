<template>
  <div class="search-input rounded-4 px-2">
  <input
    type="text"
    class="text-input"
    placeholder="Digite aqui o nome do filme"
    />
  <Icon icon="carbon:search" class="icon" />
</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { Icon } from '@iconify/vue';

export default defineComponent({
  name: 'search-bar',
  components: { Icon },
});
</script>
<style lang="scss" scoped></style>