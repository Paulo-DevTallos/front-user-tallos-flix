<template>
  <div class="screen opac-scree">
    <div class="content">
      <form>
        <div>
          <img src="/img/logo-tallos.png" alt="Logo Tallos">
        </div>
        <label>Email</label>
        <input type="text" placeholder="email"/>
        <label>Senha</label> 
        <input type="text" placeholder="Senha">
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Login',
});
</script>

<style lang="scss" scoped>
@import '../assets/sass/main.scss'
</style>