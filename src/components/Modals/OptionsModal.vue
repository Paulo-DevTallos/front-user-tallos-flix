<template>
  <div class="box-modal wd-modal">
    <Icon icon="eva:close-fill" @click="$emit('closeWindow')"/>
    <div class="avatar-container pt-4">{{ action }}</div>
    <footer class="container-btn-modal pt-4">
      <button @click="$emit('closeWindow')">OK</button>
      <button v-if="hiddenBtnLogin" @click="redirectAction">Logar</button>
      <button v-if="hiddenBtnRemoveFav" @click="$emit('redirect', id, favoriteIndexOf)">Remover</button>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Icon } from '@iconify/vue';

export default defineComponent({
  name: 'OptionsModal',
  components: { Icon },
  emits: ['closeWindow', 'redirect'],
  props: {
    action: String,
    hiddenBtnLogin: Boolean,
    hiddenBtnRemoveFav: Boolean,
  },
  data() {
    return {
      id: String,
      favoriteIndexOf: Number,
    }
  },
  methods: {
    redirectAction(): void | URL {
      return this.$router.replace({ path: '/login' });
    }
  }
});
</script>

<style lang="scss" scoped></style>