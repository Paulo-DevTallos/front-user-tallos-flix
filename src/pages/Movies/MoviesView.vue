<template>
  <div
    class="home-field d-flex justify-content-center align-items-center flex-column gap-5"
  >
    <div class="search-components">
      <SearchBar />
    </div>
  </div>
</template>

<script lang="ts">
import SearchBar from "../../components/SearchBar.vue";
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MoviesView',
  components: { SearchBar },
});
</script>

<style lang="sass" scoped></style>
