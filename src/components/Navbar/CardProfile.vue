<template>
  <div class="drop-down-menu">
    <b-dropdown-item @click="$emit('changeAvatar')">Trocar Avatar</b-dropdown-item>
    <b-dropdown-item :to="`/home/${favorites}`">Meus Favoritos</b-dropdown-item>
    <b-dropdown-item :to="`/home/${avaliable}`">Minhas Avaliações</b-dropdown-item>
    <b-dropdown-item @click="$emit('logout')">Sair</b-dropdown-item>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CardProfile',
  emits: ['changeAvatar', 'logout'],
  props: {
    favorites: {
      type: String,
    },
    avaliable: {
      type: String,
    },
  },
});
</script>
