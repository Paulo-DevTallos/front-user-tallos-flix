<template>
	<div
		class="d-flex peopleContainer gap-5 mb-5"
		v-if="$store.state.Peoples.People.length !== 0"
	>
		<div>
			<img
				:src="$store.state.Peoples.People[0].image.url"
				alt="PeopleImg"
				class="peopleImage"
			/>
		</div>
		<div class="peopleBiography">
			<h6 class="mb-4">Biografia:</h6>
			<p>{{ $store.state.Peoples.People[0].miniBios }}</p>
		</div>
	</div>
	<div v-if="$store.state.Peoples.People.length !== 0">
		<h3 id="people-carousel-title-Biography">
			Filmes de "{{ $store.state.Peoples.People[0].name }}"
		</h3>
		<!--<Carousel :People="true" class="pb-5" :hiddenMovieInfo="true" />-->
		<SlideCarousel :People="true" class="pb-5" :hiddenMovieInfo="true" />
	</div>
	<div v-else id="carousel-people-notFind">
		<h3 id="people-carousel-title">
			Filmes de {{ $store.state.Favorites.PeopleName }}
		</h3>
		<div class="home-carousel">
			<SlideCarousel
				:People="true"
				class="pb-5"
				id="carousel-peoplo-notFind"
				:hiddenMovieInfo="true"
			/>
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import SlideCarousel from '@/components/Carousel/SlideCarousel.vue';
//import Carousel from '@/components/Carousel.vue';
export default defineComponent({
	name: 'PeopleView',
	components: {
		SlideCarousel,
		//Carousel,
	},

	mounted() {
		this.$store.state.Peoples.People = [];
	},
});
</script>
<style lang="scss" scoped>
.peopleImage {
	max-width: 300px;
	max-height: 300px;
}
.peopleBiography {
	color: white;
	height: 38vh;
	overflow: auto;
	display: flex;
	flex-direction: column;
	p {
		text-align: justify;
	}
}
.peopleContainer {
	margin-top: 30vh;
}
#people-carousel-title {
	color: white;
	margin-top: 30vh;
	margin-bottom: 2rem;
}
#people-carousel-title-Biography {
	color: white;
	margin-bottom: 2rem;
}
#carousel-people-notFind {
	padding-bottom: 5vh;
}
</style>
