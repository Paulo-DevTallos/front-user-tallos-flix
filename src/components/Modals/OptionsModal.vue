<template>
  <div class="box-modal wd-modal">
    <Icon icon="eva:close-fill" @click="$emit('closeWindow')"/>
    <div class="avatar-container pt-4">
      Você precisa estár logado para {{ action }} !
    </div>
    <footer class="container-btn-modal pt-4">
      <button @click="$emit('closeWindow')">OK</button>
      <button @click="redirectToLogin">Logar</button>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Icon } from '@iconify/vue';

export default defineComponent({
  name: 'OptionsModal',
  components: { Icon },
  emits: ['closeWindow'],
  props: {
    action: String,
  },
  methods: {
    redirectToLogin(): void | URL {
      return location.replace('/login');
    }
  }
});
</script>

<style lang="scss" scoped></style>