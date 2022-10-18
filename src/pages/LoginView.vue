<!-- eslint-disable prettier/prettier -->
<template>
  <div class="screen opac-scree">
    <div class="content">
      <div class="form-container">
        <div class="container-logo">
          <img src="/img/logo-tallos.png" alt="Logo Tallos" />
        </div>
        <div class="container-links slide-controls">
          <input type="radio" name="slide" id="enter" checked />
          <input type="radio" name="slide" id="register" />
          <label for="enter" class="slide enter">Entrar</label>
          <label for="register" class="slide register">Cadastrar</label>
          <div class="slider-tab"></div>
        </div>
        <div class="form-inner">
          <div class="inner-slide">
            <div class="enter form">
              <FormLogin 
                :data_btn="btn_login" 
              />
            </div>
            <div class="register form">
              <FormRegister 
                :data_btn="btn_register" 
              />
            </div>
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
    };
  },
});
</script>

<style lang="scss" scoped></style>
