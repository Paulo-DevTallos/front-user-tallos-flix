<template>
  <div class="screen opac-scree">
    <div class="content">
      <form>
        <div class="container-logo">
          <img src="/img/logo-tallos.png" alt="Logo Tallos" />
        </div>
        <div class="container-links">
          <div>Entrar</div>
          <div>Cadastrar</div>
        </div>
        <div class="forms-fields">
          <div class="input-container-style">
            <Icon icon="carbon:email" />
            <input type="text" placeholder="Email" />
          </div>
          <div class="input-container-style">
            <Icon icon="carbon:locked" />
            <input type="text" placeholder="Senha" />
            <Icon icon="carbon:view-off" id="view-icon" />
          </div>
          <a href="#">Esqueci a senha. Enviar por e-mail</a>
          <div class="btn-container">
            <button>Entrar</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Icon } from '@iconify/vue';

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Login',
  components: {
    Icon,
  },
});
</script>

<style lang="scss" scoped></style>
