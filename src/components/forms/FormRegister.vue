<!-- eslint-disable prettier/prettier -->
<template>
  <form @submit.prevent="$emit('createNewUser', user)">
    <div class="forms-fields">
      <div class="input-container-style">
        <Icon icon="carbon:user" />
        <input type="text" id="wd-input" placeholder="Nome do usuário" v-model="user.name"/>
      </div>
      <div class="input-container-style">
        <Icon icon="carbon:email" />
        <input type="text" class="wd-input" placeholder="E-mail" v-model="user.email"/>
      </div>
      <div class="input-container-style">
        <Icon icon="carbon:locked" />
        <input :type="inputType" placeholder="Senha" v-model="user.password"/>
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
  emits: ['createNewUser'],
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
      user: {
        name: '',
        email: '',
        password: '',
      },
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
  },
});
</script>

<style lang="scss"></style>
