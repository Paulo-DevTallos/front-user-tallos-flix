<template>
	<div class="erro-field-container">
		<header-app />
		<div class="template-container">
			<div class="container-error mt-4">
				<ErrorComponent :error_value="'Error 404 página não encontrada'"/>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import HeaderApp from '@/components/Header/HeaderApp.vue';
import ErrorComponent from '@/components/ErrorComponent.vue';

export default defineComponent({
	name: 'NotFoundView',
	components: {
		HeaderApp,
		ErrorComponent,
	},
});
</script>

<style lang="scss">
.erro-field-container {
	font-family: 'Nunito', sans-serif;
	background-color: #3f3f3f;
	min-height: 100vh;
	h2 {
		color: #cbd6db;
	}
}
</style>
