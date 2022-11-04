<template>
  <div class="box-modal">
    <Icon icon="eva:close-fill" @click="$emit('closeWindow')" />
    <header class="header-modal">Escolha seu avatar:</header>
    <div class="avatar-container">
      <div class="roll" @click="chooseAvatar('girl-avatar.png')">
        <img :src="`${this.field}/girl-avatar.png`" alt="avatar girl" />
      </div>
      <div class="roll" @click="chooseAvatar('excenctric-avatar.png')">
        <img
          :src="`${this.field}/excenctric-avatar.png`"
          alt="avatar excenctric"
        />
      </div>
      <div class="roll" @click="chooseAvatar('woman-avatar.png')">
        <img :src="`${this.field}/woman-avatar.png`" alt="avatar woman" />
      </div>
      <div class="roll" @click="chooseAvatar('ninja-avatar.png')">
        <img :src="`${this.field}/ninja-avatar.png`" alt="avatar ninja" />
      </div>
      <div class="roll" @click="chooseAvatar('empty-avatar.png')">
        <img :src="`${this.field}/empty-avatar.png`" alt="avatar vazio" />
      </div>
    </div>
    <footer class="container-btn-modal">
      <button @click="$emit('closeWindow')">Cancelar</button>
      <button @click="saveAvatar">Salvar</button>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Icon } from '@iconify/vue';
import { APP_URL } from '@/constants';

export default defineComponent({
  name: 'AvatarModal',
  components: { Icon },
  emits: ['closeWindow'],
  data() {
    return {
      field: APP_URL + 'img',
      selectedAvatar: '',
    };
  },
  methods: {
    chooseAvatar(data: string) {
      this.selectedAvatar = data;
    },
    saveAvatar() {
      const userData = {
        id: this.$store.state.Users.UserId,
        user: {
          avatar: this.selectedAvatar,
        },
      }
      this.$store.dispatch('Users/updateUser', userData);
      this.$emit('closeWindow');
    },
  },
});
</script>

<style lang="scss" scoped></style>
