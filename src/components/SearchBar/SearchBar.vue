<template>
	<div class="search-input rounded-4 px-2">
		<input
			type="text"
			class="text-input"
			placeholder="Digite aqui o nome do filme"
			v-model="MovieFilter"
			@keyup="$emit('search', MovieFilter)"
			@keypress.enter="redirectToSearchRouter(loadRouter)"
		/>
		<router-link :to="{ path: '/home/movies' }">
			<Icon
				icon="carbon:search"
				class="icon"
				@click="$emit('search', MovieFilter)"
			/>
		</router-link>
	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { Icon } from '@iconify/vue';

export default defineComponent({
	name: 'search-bar',
	components: { Icon },
	props: {
		Series: { type: Boolean },
		RenderMovie: { type: Boolean },
		loadRouter: { type: String, default: '' },
	},
	emits: ['search'],
	data() {
		return {
			MovieFilter: '',
			isChanged: '',
		};
	},

	methods: {
		redirectToSearchRouter(loadRouter: string) {
			this.$router.push(loadRouter);
		},
	}
});
</script>
