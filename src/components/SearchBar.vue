<template>
  <div class="search-input rounded-4 px-2">
    <input
      type="text"
      class="text-input"
      placeholder="Digite aqui o nome do filme"
      v-model="this.MovieFilter"
      @keyup="$emit('search', MovieFilter)"
    />
    <Icon icon="carbon:search" class="icon" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { Icon } from '@iconify/vue';

export default defineComponent({
  name: 'search-bar',
  components: { Icon },
  props: { Series: Boolean },
  emits: ['search'],
  data() {
    return {
      MovieFilter: '',
      isChanged: '',
    };
  },
});
</script>
<style lang="scss" scoped></style>
