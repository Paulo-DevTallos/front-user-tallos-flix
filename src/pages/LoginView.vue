<!-- eslint-disable prettier/prettier -->
<template>
  <div class="screen">
    <div class="content">
      <div class="form-container">
        <div class="container-logo">
          <img src="/img/logo-tallos.png" alt="Logo Tallos" />
        </div>
        <div class="slide-controls">
          <input type="radio" name="slide" id="enter" checked @click="formLogin" />
          <input type="radio" name="slide" id="register" @click="formRegister" />
          <label for="enter" class="slide enter">Entrar</label>
          <label for="register" class="slide register">Cadastrar</label>
          <div class="slider-tab"></div>
        </div>
        <div class="form-data-container">
          <div class="form-inner">
            <FormLogin
              @submitLogin="handleSubmitLogin"
              v-if="callFormLogin"
              :data_btn="btn_login" 
            />
            <FormRegister 
              @createNewUser="handleCreateNewUser"
              v-if="callFormRegister"
              :data_btn="btn_register" 
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import FormLogin from '../components/forms/FormLogin.vue';
import FormRegister from '../components/forms/FormRegister.vue';

export default defineComponent({
  name: 'LoginView',
  components: {
    FormLogin,
    FormRegister,
  },

  data() {
    return {
      btn_login: 'Entrar',
      btn_register: 'Cadastrar',
      callFormLogin: true,
      callFormRegister: true,
    };
  },

  methods: {
    formLogin(): void {
      this.callFormRegister = false;
      this.callFormLogin = true;
    },

    formRegister(): void {
      this.callFormLogin = false;
      this.callFormRegister = true;
    },

    //evento de login
    async handleSubmitLogin(user: object) {
      this.$store.dispatch('Users/login', user);
    },

    //evento de create new user
    handleCreateNewUser(user: object) {
    },
  },
});
</script>

<style lang="scss" scoped></style>
