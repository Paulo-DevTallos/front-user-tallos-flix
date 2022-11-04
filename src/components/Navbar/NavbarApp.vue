<template>
  <b-navbar toggleable="lg" type="light">
    <div class="border-menu" @click="showMenuMobile">
      <Icon icon="charm:menu-hamburger" width="35" color="#fff" />
    </div>
    <div class="menu-mobile" v-if="hiddenMenuMobile">
      <b-nav-item class="texto-navbar" :to="{ name: 'theaters' }">
        Somente nos Cinemas
      </b-nav-item>
      <b-nav-item :to="{ name: 'movies' }"> Filmes </b-nav-item>
      <b-nav-item :to="{ name: 'series' }">Series</b-nav-item>
    </div>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="d-flex justify-content-between">
        <b-collapse class="d-flex">
          <b-nav-item class="texto-navbar" :to="{ name: 'theaters' }">
            Somente nos Cinemas
          </b-nav-item>
          <b-nav-item :to="{ name: 'movies' }"> Filmes </b-nav-item>
          <b-nav-item :to="{ name: 'series' }">Series</b-nav-item>
        </b-collapse>
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
          <b-dropdown-item :to="{ name: 'favorites' }"
            >Meus Favoritos</b-dropdown-item
          >
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
import { Icon } from '@iconify/vue';

export default defineComponent({
  name: 'NavbarApp',
  components: { AvatarModal, Icon },
  data() {
    return {
      UserLogged: this.$store.state.Users.UserName,
      NoUser: 'Faça Login',
      avatar: '/img/' + this.$store.state.Users.UserAvatar,
      noAvatar: '/img/user-default.png',
      hiddenDropDown: false,
      hiddenAvatarModal: false,
      hiddenMenuMobile: false,
    };
  },
  computed: {
    AvatarUser(): string {
      return this.UserLogged && this.$store.state.Users.UserAvatar !== ''
        ? this.avatar
        : this.noAvatar;
    },
  },
  methods: {
    showMenuMobile() {
      this.hiddenMenuMobile = !this.hiddenMenuMobile;
    },

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
