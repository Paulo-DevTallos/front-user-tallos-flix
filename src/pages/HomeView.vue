<template>
	<div
		class="home-field d-flex justify-content-center align-items-center flex-column gap-5"
	>
		<h1 v-if="user_name_logged ? user_name_logged : title_dislogged">
			{{ user_name_logged || title_dislogged }} sobre qual filme quer conhecer
			hoje ?
		</h1>
		<SearchBar :loadRouter="'/home/movies'" @search="searchMovie" />
		<div class="home-carousel" v-if="hiddenCarousel">
			<Caroussel :title_carousel="'Nos Cinemas'" />
		</div>
		<ErrorComponent
			:error_value="'Não encontramos filmes com a palavra'"
			:data_word="movies_name"
			v-if="hiddenErrorSearch"
		/>
	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { SocketModule } from '@/services/socket';
import ErrorComponent from '@/components/ErrorComponent.vue';
import Caroussel from '@/components/Caroussel.vue';
import SearchBar from '@/components/SearchBar/SearchBar.vue';
import { mapGetters } from 'vuex';

export default defineComponent({
	name: 'HomeView',
	components: {
		SearchBar,
		ErrorComponent,
		Caroussel,
	},
	data() {
		return {
			socketService: SocketModule.connect(),
			isChanged: '',
			movies_name: '',
			title_dislogged: `Olá, `,
			user_name_logged: `Olá ${this.$store.state.Users.UserName.split(' ')
				.slice(0, 2)
				.toString()
				.replace(',', ' ')},`,
			hiddenCarousel: true,
			hiddenErrorSearch: false,
			render: false,
		};
	},

	methods: {
		searchMovie(data: string) {
			this.$store.state.Movies.dontRender = true;
			this.$store.state.Movies.searchData = data;
		},
	},

	watch: {
		['Movies/getErrorPage'](data) {
			if (data === true) {
				this.hiddenErrorSearch = true;
				this.hiddenCarousel = false;
				this.render = false;
			} else {
				this.hiddenErrorSearch = false;
				this.hiddenCarousel = true;
				this.render = true;
			}
		},
	},

	computed: {
		...mapGetters(['Movies/getErrorPage']),
	},

	mounted() {
		this.$store.dispatch(
			'Favorites/getFavoriteById',
			this.$store.state.Users.UserId,
		);
		this.$store.dispatch(
			'Favorites/getFavoriteById',
			this.$store.state.Users.UserId,
		);
	},
});
</script>
