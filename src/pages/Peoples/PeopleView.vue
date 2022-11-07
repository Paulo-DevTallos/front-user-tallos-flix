<template>
  <div class="d-flex peopleContainer gap-5 mb-5">
    <div>
      <img
        :src="this.$store.state.Peoples.People[0].image.url"
        alt="PeopleImg"
        class="peopleImage"
      />
    </div>
    <div class="peopleBiography">
      <h6 class="mb-4">Biografia:</h6>
      <p>{{ this.$store.state.Peoples.People[0].miniBios }}</p>
    </div>
  </div>
  <h3 id="people-carousel-title">
    Filmes de "{{ this.$store.state.Peoples.People[0].name }}"
  </h3>
  <Carousel :People="true" class="pb-5" />
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import Carousel from '@/components/Carousel.vue';
export default defineComponent({
  components: {
    Carousel,
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
  margin-bottom: 2rem;
}
</style>
