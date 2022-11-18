<template>
	<div class="container-error">
		<h2 class="error-text-message">{{ error_value }} {{ data_word }}</h2>
		<!--lembrar de remover o v-prev-->
		<img src="/img/cuate.png" alt="imagem de erro" />
	</div>
	<!--Não encontramos filmes com a palavra-->
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'ErrorComponent',
	props: {
		data_word: String,
		error_value: String,
	},
});
</script>

<style lang="scss" scoped>
.error-text-message {
	color: #cbd6db;
	font-family: 'Nunito', sans-serif;
}
</style>
