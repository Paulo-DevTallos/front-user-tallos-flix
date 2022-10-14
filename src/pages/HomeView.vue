<template>
  <div class="teste">
    <h1>Pagina Home TallosFlix</h1>
    <b-button variant="outline-primary">Teste</b-button>
    <Icon icon="ci:css3" />
  </div>
</template>

<script lang="ts">
import { Icon } from '@iconify/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomeView',
  components: { Icon },
});
</script>

<style lang="scss" scoped>
svg {
  font-size: 50px;
  color: blue;
}
</style>
