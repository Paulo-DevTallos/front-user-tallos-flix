<template>
  <div class="box-modal">
    <Icon icon="eva:close-fill" @click="$emit('closeWindow')"/>
    <header class="header-modal">
      Escolha seu avatar:
    </header>
    <div class="avatar-container">
      <div class="roll">

      </div>
      <div class="roll">
        
      </div>
      <div class="roll">

      </div>
      <div class="roll">

      </div>
      <div class="roll">

      </div>
    </div>
    <footer class="container-btn-modal">
      <button @click="$emit('closeWindow')">Cancelar</button>
      <button>Salvar</button>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Icon } from '@iconify/vue';

export default defineComponent({
  name: 'AvatarModal',
  components: { Icon },
  emits: ['closeWindow'],
});
</script>

<style lang="scss" scoped></style>
