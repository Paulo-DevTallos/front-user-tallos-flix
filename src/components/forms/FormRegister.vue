<!-- eslint-disable prettier/prettier -->
<template>
  <form @submit.prevent="teste">
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
        <input :type="inputType" placeholder="Senha" />
        <RevelingPassword 
          @toggle="togglePassword"
          :isPassword="isPasswordVisible"
        />
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
import RevelingPassword from '../RevelingPassword.vue';

export default defineComponent({
  name: 'FormRegister',
  components: {
    Icon,
    RevelingPassword,
},
  props: {
    data_btn: String,
  },

  data() {
    return {
      inputType: 'password',
    };
  },

  computed: {
    isPasswordVisible(): boolean {
      return this.inputType === 'text';
    },
  },

  methods: {
    togglePassword(): void {
      this.inputType = this.isPasswordVisible ? 'password' : 'text';
    },

    teste() {
      console.log('teste');
    }
  },
});
</script>

<style lang="scss"></style>
