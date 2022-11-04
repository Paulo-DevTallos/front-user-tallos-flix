<template>
  <div class="d-flex peopleContainer gap-5 mb-5">
    <img
      :src="this.$store.state.Peoples.People[0].image.url"
      alt="PeopleImg"
      class="peopleImage"
    />
    <h4 class="peopleBiography">
      Biografia:<br />{{ this.$store.state.Peoples.People[0].miniBios }} />
    </h4>
  </div>
  <Carousel :People="true" />
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
  height: 35vh;
  overflow: auto;
}
.peopleContainer {
  margin-top: 30vh;
}
</style>
