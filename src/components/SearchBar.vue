<template>
  <div class="search-input rounded-4 px-2">
    <input
      type="text"
      class="text-input"
      placeholder="Digite aqui o nome do filme"
      v-model="this.MovieFilter"
      @keypress="search(this.MovieFilter)"
    />
    <Icon icon="carbon:search" class="icon" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { Icon } from '@iconify/vue';

export default defineComponent({
  name: 'search-bar',
  components: { Icon },
  props: { Series: Boolean },
  data() {
    return {
      MovieFilter: '',
    };
  },
  methods: {
    search(data: string) {
      if (this.Series == false) {
        this.$store.dispatch('Movies/getMovieFilter', {
          field: 'title',
          search: data,
        });
      } else {
        this.$store.dispatch('Movies/getSeries', {
          field: 'title',
          search: data,
        });
        this.$store.state.Movies.Movies.content =
          this.$store.state.Movies.Series.content;
      }
    },
  },
});
</script>
<style lang="scss" scoped></style>
