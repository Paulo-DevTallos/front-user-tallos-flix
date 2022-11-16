<template>
	<div class="container-full">
		<h4>Nos Cinemas</h4>
		<button @click="prev" class="arrow-left">
			<Icon icon="carbon:chevron-left" />	
		</button>
		<button @click="next" class="arrow-right">
			<Icon icon="carbon:chevron-right" />
		</button>
		<div class="carousel-container">
			<div
				v-for="movie in $store.state.Movies.Movies.content"
				:key="movie._id"
				class="gallery-wrapper"
			>
				<div class="gallery-movies">
					<img
						class="item-image-poster"
						v-if="movie.poster ? movie.poster : empty.poster"
						:src="movie.poster || empty.poster"
						alt="movie.title"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Icon } from '@iconify/vue';

export default defineComponent({
	name: 'SlideCarousel',
	components: { Icon },
  data() {
		return {
			movies: [],
      empty: {
				poster: '/img/empty-img.png',
      },
    };
  },

  methods: {
		next() {
			const items = document.querySelectorAll('.item-image-poster');
			let currentItem = 0;
			const maxItems = items.length;

			currentItem--

			if (currentItem >= maxItems) {
				currentItem = 0;
			}

			if (currentItem < 0) {
				currentItem = maxItems - 1;
			}

			items[currentItem].scrollIntoView({
				behavior: "smooth",
				block: 'nearest',
			});
		},

		prev() {
			const items = document.querySelectorAll('.item-image-poster');
			let currentItem = 0;
			const maxItems = items.length;

			currentItem++;

			if (currentItem <= maxItems) {
				currentItem = 0;
			}

			if (currentItem > 0) {
				currentItem = maxItems + 1;
			}

			items[currentItem].scrollIntoView({
				behavior: "smooth",
				block: 'nearest',
			});
		},
	}
});
</script>

<style lang="scss" scoped>
.container-full {
	position: relative;
	max-width: 1280px;

	h4 {
		margin-left: 9%;
		margin-bottom: 0;
		font-family: 'Nunito', Arial, Helvetica, sans-serif;
		font-weight: 500;
		font-size: 30px;
		color: #fff;
	}

	.arrow-left,
	.arrow-right {
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		left: 0;
		right: auto;
		bottom: 0;
		font-size: 20px;
		width: 40px;
		height: 40px;
		text-align: center;
		color: #009acc;
		cursor: pointer;
		border: none;
		border-radius: 100%;
		opacity: 1;
		background: #212121;
		transition: all 600ms ease-in-out;
	}

	.arrow-right {
		left: auto;
		right: 0;
		background-image: linear-gradient(to right, transparent 0%, black 200%);
	}

	.carousel-container {
		padding: 15px;
		position: relative;
		max-width: 84%;
		margin: 0 auto;
		overflow-x: hidden;
		display: flex;
		.gallery-wrapper {
			display: flex;
			justify-content: center;
			.gallery-movies {
				display: flex;
				flex-flow: row wrap;
				gap: 15px;
				padding: 0 40px 40px 0;

				.item-image-poster {
					width: 230px;
					height: 330px;
					flex-shrink: 0;
				}
			}
		}
	}
}
</style>
