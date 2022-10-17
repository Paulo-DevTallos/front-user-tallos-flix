<template>
  <form>
    <div class="forms-fields">
      <div class="input-container-style">
        <Icon icon="carbon:user" />
        <input type="text" placeholder="Nome do usuário" />
      </div>
      <div class="input-container-style">
        <Icon icon="carbon:email" />
        <input type="text" placeholder="E-mail" />
      </div>
      <div class="input-container-style">
        <Icon icon="carbon:locked" />
        <input type="password" placeholder="Senha" />
        <Icon icon="carbon:view" id="view-icon" />
      </div>
      <div class="btn-container">
        <button>{{ data_btn }}</button>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Icon } from '@iconify/vue';

export default defineComponent({
  name: 'FormRegister',
  components: {
    Icon,
  },
  props: {
    data_btn: String,
  },
});
</script>

<style lang="scss"></style>
