<template>
  <div class="search-input rounded-4 px-2">
    <input
      type="text"
      class="text-input"
      placeholder="Digite aqui o nome do filme"
      v-model="this.MovieFilter"
      @keyup="search(this.MovieFilter)"
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
      isChanged: '',
    };
  },
  methods: {
    search(data: string) {
      if (data !== this.isChanged) {
        this.isChanged = data;
        if (this.Series === false) {
          setTimeout(() => {
            if (this.isChanged === data) {
              this.$store.dispatch('Movies/getMovieFilter', {
                field: 'title',
                search: data,
              });
            }
          }, 1000);
        } else {
          setTimeout(() => {
            if (this.isChanged === data) {
              this.$store.dispatch('Movies/getSeries', {
                field: 'title',
                search: data,
              });
            }
          }, 1000);
        }
      }
    },
  },
});
</script>
<style lang="scss" scoped></style>
