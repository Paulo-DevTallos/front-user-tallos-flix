<template>
  <div class="theaters-form-container">
    <p class="plot-title ps-5 mt-4">Lista de cinemas perto de você</p>
    <hr class="orange-line-separator" />
    <ul
      class="theaters-list d-flex flex-column"
      v-for="Theater in this.$store.state.Theaters.NearTheaters"
      :key="Theater.theaterId"
    >
      <li class="theaters-item">
        {{ Theater.location.address.state }} -
        {{ Theater.location.address.city }} -
        {{ Theater.location.address.street1 }}
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TheatersList',
});
</script>
<style lang="scss" scoped></style>
