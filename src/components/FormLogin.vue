<template>
  <form>
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
        <button>{{ data_btn }}</button>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Icon } from '@iconify/vue';

export default defineComponent({
  name: 'FormLogin',
  components: {
    Icon,
  },
  props: {
    data_btn: String,
  },
});
</script>
