<template>
	<div class="toast-success">
		<p>{{ message_success }}</p>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'SuccessModal',
	props: {
		message_success: String,
	},
});
</script>
