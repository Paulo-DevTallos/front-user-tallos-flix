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
              :hiddenError="hiddenErrorMessage"
              :message_error="message"
            />
            <FormRegister 
              @createNewUser="handleCreateNewUser"
              v-if="callFormRegister"
              :data_btn="btn_register" 
              :message_error="message"
              :hiddenError="hiddenErrorRegister"
            />
          </div>
        </div>
      </div>
    </div>
    <SuccessModal :message_success="success" v-if="hiddenSuccessModal"/>
  </div>
</template>

<script lang="ts">
import SuccessModal from '@/components/Modals/SuccessModal.vue';
import { defineComponent } from 'vue';
import FormLogin from '../components/forms/FormLogin.vue';
import FormRegister from '../components/forms/FormRegister.vue';
import ServiceCreateUser from '../services/axios/UserRequests';

export default defineComponent({
  name: 'LoginView',
  components: {
    FormLogin,
    FormRegister,
    SuccessModal,
  },

  data() {
    return {
      btn_login: 'Entrar',
      btn_register: 'Cadastrar',
      message: '',
      callFormLogin: true,
      callFormRegister: true,
      hiddenErrorMessage: false,
      hiddenErrorRegister: false,
      hiddenSuccessModal: false,
      success: '',
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
      await this.$store.dispatch('Users/login', user)
        .then(res => this.$router.go(-1))
        .catch((err) => {
          if (user.email === '' && user.password === '') {
            console.error(err.response.data.message);
            this.message = 'Campos vazio, digite seu email e senha!';
            this.hiddenErrorMessage = true;
          }
          else if (!user.email) {
            console.error(err.response.data.message);
            this.message = 'O campo de e-mail está vazio!';
            this.hiddenErrorMessage = true;
          }
          else if (!user.password) {
            console.error(err.response.data.message);
            this.message = 'O campo de senha está vazio!';
            this.hiddenErrorMessage = true;
          }
          else if (err) {
            console.error(err.response.data.message);
            this.message = 'E-mail ou Senha incorretos, Verifique novamente!';
            this.hiddenErrorMessage = true;
          }
      });
    },

    //evento de create new user
    async handleCreateNewUser(user: object) {
      await ServiceCreateUser.createUser(user)
      .then(res => {
        if (res.status === 201) {
          this.hiddenSuccessModal = true;
          this.success = `Usuário ${res.data.name} realizado com sucesso!`;
          setTimeout(() => {
            this.hiddenSuccessModal = false;
          }, 3000);
          this.callFormRegister = false;
          this.callFormLogin = true;
          document.getElementById('enter').checked = true;
          this.hiddenErrorRegister = false;
        }
      })
      .catch(err => {
        if (!user.name && !user.email && !user.password) {
          console.error(err.response.data.message);
          this.message = 'Campos vazios, digite os dados para cadastro!';
          this.hiddenErrorRegister = true;
        }
        else if (!user.name) {
          console.error(err.response.data.message);
          this.message = 'Campos vazio, digite um nome de usuário!';
          this.hiddenErrorRegister = true;
        }
        else if (!user.email) {
          console.error(err.response.data.message);
          this.message = 'Campos vazio, digite um email válido!';
          this.hiddenErrorRegister = true;
        } 
        else if (!user.password) {
          console.error(err.response.data.message);
          this.message = 'Campos vazio, digite uma senha válida!';
          this.hiddenErrorRegister = true;
        }
        else if (err.response.data.message[0]) {
          console.error(err.response.data.message);
          this.message = 'A senha precisa ser longa ou ter pelo menos 4 caracteres';
          this.hiddenErrorRegister = true;
        }
      })
    }
  },
});
</script>

<style lang="scss" scoped></style>
