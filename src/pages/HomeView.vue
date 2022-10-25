<template>
  <div
    class="home-field d-flex justify-content-center align-items-center flex-column gap-5"
  >
    <h1>
      Olá {{ this.$store.state.Users.UserName }}, sobre qual filme quer conhecer
      hoje ?
    </h1>
    <SearchBar />
    <div class="home-carousel d-flex flex-column p-2 pb-3 mb-3">
      <h4>Nos Cinemas</h4>
      <Carousel :hiddenMovieInfo="false" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { SocketModule } from '@/services/socket';
//import io from 'socket.io-client'
import SearchBar from '@/components/SearchBar.vue';
import Carousel from '@/components/Carousel.vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    SearchBar,
    Carousel,
  },
  data() {
    return {
      socketService: SocketModule.connect(),
    };
  },

  mounted() {
    this.socketService.registerListener('is-logged', 'is-logged', (data) => {
      alert(data);
    });
  },
});
</script>
<style lang="scss" scoped></style>
