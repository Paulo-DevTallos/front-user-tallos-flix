<template>
  <div class="screen opac-scree">
    <div class="content">
      <form>
        <div class="container-logo">
          <img src="/img/logo-tallos.png" alt="Logo Tallos" />
        </div>
        <div class="input-container-style">
          <Icon icon="carbon:user" />
          <input type="text" placeholder="Email" />
        </div>
        <div class="input-container-style">
          <Icon icon="carbon:locked" />
          <input type="text" placeholder="Senha" />
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
