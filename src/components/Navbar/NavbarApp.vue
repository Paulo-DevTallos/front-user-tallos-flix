<template>
  <b-navbar toggleable="lg" type="light">
    <div class="border-menu" @click="showMenuMobile" ref="menuMobile">
      <Icon icon="charm:menu-hamburger" width="35" color="#fff" />
    </div>
    <div class="menu-mobile" v-if="hiddenMenuMobile">
      <b-nav-item
        class="texto-navbar"
        :to="{ name: 'theaters' }"
        @click="showMenuMobile"
      >
        Somente nos Cinemas
      </b-nav-item>
      <b-nav-item :to="{ name: 'movies' }" @click="showMenuMobile">Filmes</b-nav-item>
      <b-nav-item :to="{ name: 'series' }" @click="showMenuMobile">Series</b-nav-item>
    </div>
    <MenuMobile :movies="'movies'" :series="'series'" />
    <nav>
      <b-navbar-nav @click="redirect" class="type-cursor">
        <div
          class="d-flex align-items-center"
          @click="callDropDown"
          ref="myref"
        >
          <div class="m-2 name-user" v-if="UserLogged ? UserLogged : NoUser">
            {{ UserLogged || NoUser }}
          </div>
          <b-avatar
            variant="light-primary"
            size="40"
            :src="AvatarUser"
          ></b-avatar>
        </div>
        <CardProfile 
          v-if="hiddenDropDown"
          :favorites="'favorites'"
          :avaliable="'avaliable'"
          @changeAvatar="changeAvatar"
          @logout="Logout"
        />
      </b-navbar-nav>
    </nav>
  </b-navbar>
  <AvatarModal v-if="hiddenAvatarModal" @closeWindow="closeAvatarModal" />
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import AvatarModal from '@/components/Modals/AvatarModal.vue';
import CardProfile from '@/components/Navbar/CardProfile.vue';
import MenuMobile from '@/components/Navbar/MenuMobile.vue';
import { Icon } from '@iconify/vue';
import { mapGetters } from 'vuex';

export default defineComponent({
  name: 'NavbarApp',
  components: { AvatarModal, Icon, CardProfile, MenuMobile },
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
    ...mapGetters(['Users/getNewAvatar']),
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
  watch: {
    ['Users/getNewAvatar'](data) {
      this.avatar = '/img/' + data;
    },
  },
  mounted() {
    const mobile: any = this.$refs.menuMobile;
    const self: any = this.$refs.myref;
    document.addEventListener('click', (e) => {
      if (self !== undefined && self.contains(e.target) === false) {
        this.hiddenDropDown = false;
      }
    });
    document.addEventListener('click', (e) => {
      if (mobile !== undefined && mobile.contains(e.target) === false) {
        this.hiddenMenuMobile = false;
      }
    });
  },
});
</script>

<style lang="scss" scoped></style>
