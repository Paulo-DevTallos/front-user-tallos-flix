<template>
	<div class="theaters-form-container">
		<p class="plot-title mt-4">Cinemas</p>
		<hr class="orange-line-separator" />
		<p class="form-theater-title mt-4">Localização:</p>
		<div class="w-100 mb-4 d-flex gap-3 h-100 box-form">
			<div class="location-input rounded-3 px-2 py-2 d-flex">
				<input
					type="text"
					placeholder="Digite sua cidade"
					v-model="theaterCity"
				/>
				<Icon icon="carbon:location" class="iconLocation" />
			</div>
			<div class="container-btn-gps">
				<button @click="SearchCity" class="localization-button rounded px-3">
					Buscar
				</button>
				<p class="ou">ou</p>
				<button
					@click="realTimeLocalization"
					class="localization-button rounded px-3"
				>
					Ativar sua localização
				</button>
			</div>
		</div>
		<SuccessModal
			v-if="hiddenToastAvliable"
			:class="isError"
			:message_success="message"
		/>
	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { Icon } from '@iconify/vue';
import SuccessModal from './Modals/SuccessModal.vue';

export default defineComponent({
	name: 'TheaterForm',
	components: {
		Icon,
		SuccessModal,
	},
	data() {
		return {
			theaterCity: '',
			message: '',
			hiddenToastAvliable: false,
			isError: 'toast_error',
		};
	},
	methods: {
		callToastMessanger(msg: string) {
			this.hiddenToastAvliable = true;
			this.message = msg;
			setTimeout(() => {
				this.hiddenToastAvliable = false;
			}, 2500);
		},
		realTimeLocalization() {
			window.navigator.geolocation.getCurrentPosition((postion) => {
				const coords = {
					lat: postion.coords.latitude,
					long: postion.coords.longitude,
				};
				this.$store.state.Theaters.UserCoords = [coords.lat, coords.long];
				this.$store.dispatch('Theaters/getTheatersBylocation', coords);
			}, console.log);
		},
		SearchCity() {
			this.$store
				.dispatch('Theaters/getTheatersByCity', this.theaterCity)
				.then(async () => {
					const response = await this.$store.state.Theaters.NearTheaters;
					console.log(response);
					if (response.length === 0) {
						this.callToastMessanger('Nenhum resultado encontrado.');
					}
				}).catch((Error: object) => {
					console.error(Error	);
					this.callToastMessanger('Digite uma cidade');
				});
			console.log(this.theaterCity);
		},
	},
});
</script>

<style>
.toast_error {
	background: red;
}
</style>
