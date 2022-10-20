<template>
  <b-navbar toggleable="lg" type="light">
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="d-flex justify-content-between">
        <b-nav-item class="texto-navbar" :to="{ name: 'theaters' }">
          Somente nos Cinemas
        </b-nav-item>
        <b-nav-item :to="{ name: 'movies' }"> Filmes </b-nav-item>
        <b-nav-item>Series</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
    <b-navbar-nav @click="redirect">
      <b-nav-item-dropdown
        toggle-class="d-flex align-items-center dropdown-user-link"
        right
        no-caret
      >
        <template #button-content>
          <div class="d-flex align-items-center">
            <div class="m-2 name-user" v-if="UserLogged ? UserLogged : NoUser">
              {{ UserLogged || NoUser }}
            </div>
            <b-avatar
              variant="light-primary"
              size="40"
              :src="AvatarUser"
            ></b-avatar>
          </div>
        </template>
        <div v-if="UserLogged">
          <b-dropdown-item>Trocar Avatar</b-dropdown-item>
          <b-dropdown-item>Meus Favoritos</b-dropdown-item>
          <b-dropdown-item>Sair</b-dropdown-item>
        </div>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </b-navbar>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      UserLogged: this.$store.state.Users.UserName,
      NoUser: 'Faça Login',
      avatar: '/img/avatar1.png',
      noAvatar: '/img/user-default.png',
    };
  },
  computed: {
    AvatarUser() {
      return this.UserLogged ? this.avatar : this.noAvatar;
    },
  },
  methods: {
    redirect() {
      return this.UserLogged
        ? this.UserLogged
        : this.$router.push({ name: 'login' });
    },
  },
});
</script>

<style lang="scss" scoped></style>
