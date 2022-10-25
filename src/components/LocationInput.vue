<template>
  <div class="location-input rounded-3 px-2 py-2 d-flex">
    <input
      type="text"
      class="text-input-location"
      placeholder="Digite aqui sua localização"
    />
    <Icon icon="carbon:location" class="iconLocation" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { Icon } from '@iconify/vue';
export default defineComponent({
  name: 'location-input',
  components: { Icon },
});
</script>
<style lang="scss" scoped></style>
