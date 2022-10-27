<template>
  <b-navbar toggleable="lg" type="light">
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="d-flex justify-content-between">
        <b-nav-item class="texto-navbar" :to="{ name: 'theaters' }">
          Somente nos Cinemas
        </b-nav-item>
        <b-nav-item :to="{ name: 'movies' }"> Filmes </b-nav-item>
        <b-nav-item :to="{ name: 'series' }">Series</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
    <nav>
      <b-navbar-nav @click="redirect" class="type-cursor">
        <div class="d-flex align-items-center" @click="callDropDown">
          <div class="m-2 name-user" v-if="UserLogged ? UserLogged : NoUser">
            {{ UserLogged || NoUser }}
          </div>
          <b-avatar
            variant="light-primary"
            size="40"
            :src="AvatarUser"
          ></b-avatar>
        </div>
        <div class="drop-down-menu" v-show="hiddenDropDown">
          <b-dropdown-item @click="changeAvatar">Trocar Avatar</b-dropdown-item>
          <b-dropdown-item :to="{name : 'favorites'}">Meus Favoritos</b-dropdown-item>
          <b-dropdown-item @click="Logout">Sair</b-dropdown-item>
        </div>
      </b-navbar-nav>
    </nav>
  </b-navbar>
  <AvatarModal v-if="hiddenAvatarModal" @closeWindow="closeAvatarModal" />
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import AvatarModal from '@/components/Modals/AvatarModal.vue';

export default defineComponent({
  name: 'NavbarApp',
  components: { AvatarModal },
  data() {
    return {
      UserLogged: this.$store.state.Users.UserName,
      NoUser: 'Faça Login',
      avatar: '/img/avatar1.png',
      noAvatar: '/img/user-default.png',
      hiddenDropDown: false,
      hiddenAvatarModal: false,
    };
  },
  computed: {
    AvatarUser(): string {
      return this.UserLogged ? this.avatar : this.noAvatar;
    },
  },
  methods: {
    changeAvatar(): void {
      this.hiddenAvatarModal = true;
      this.hiddenDropDown = false;
    },

    closeAvatarModal(): void {
      this.hiddenAvatarModal = false;
    },

    callDropDown(): void {
      if (this.UserLogged) {
        this.hiddenDropDown = !this.hiddenDropDown;
      }
    },
    redirect(): string {
      return this.UserLogged ? this.UserLogged : location.replace('/login');
    },
    Logout(): void {
      location.replace('/');
      localStorage.clear();
    },
  },
});
</script>

<style lang="scss" scoped></style>
