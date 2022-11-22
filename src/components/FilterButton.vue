<template>
  <div class="me-5 box-filter-container">
    <div class="d-flex gap-5" ref="filters">
      <button
        class="search-input wd-btn text-input styles-filter"
        @click="callBoxFilter"
      >
        Filtrar...
        <Icon icon="dashicons:arrow-down-alt2" />
      </button>
      <div class="box-filter-bar" v-if="hiddenBoxFilter">
        <ul>
          <li @click="callBoxFilter2">
            Gênero
            <Icon
              icon="dashicons:arrow-right-alt2"
              color="black"
              class="ms-1"
            />
            <ul class="box-filter-bar" id="box-filter2" v-if="hiddenBoxFilter2">
              <li @click="searchGenre('Action')">Ação</li>
              <li @click="searchGenre('Adventure')">Aventura</li>
              <li @click="searchGenre('Comedy')">Comédia</li>
              <li @click="searchGenre('Documentary')">Documentário</li>
              <li @click="searchGenre('Drama')">Drama</li>
              <li @click="searchGenre('Sci-Fi')">Ficção Científica</li>
              <li @click="searchGenre('Fantasy')">Fantasia</li>
              <li @click="searchGenre('Musical')">Musical</li>
              <li @click="searchGenre('Horror')">Terror</li>
            </ul>
          </li>
          <li @click="callBoxFilter3">
            Ano
            <Icon
              icon="dashicons:arrow-right-alt2"
              color="black"
              class="ms-1"
            />
            <ul class="box-filter-bar" id="box-filter2" v-if="hiddenBoxFilter3">
              <li @click="order(-1)">Mais Recentes</li>
              <li @click="order(1)">Mais Antigos</li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { Icon } from '@iconify/vue';
export default defineComponent({
  name: 'filter-button',
  components: { Icon },
  props: { FilterSeries: { type: Boolean } },
  data() {
    return {
      hiddenBoxFilter: false,
      hiddenBoxFilter2: false,
      hiddenBoxFilter3: false,
    };
  },
  methods: {
    callBoxFilter(): void {
      this.hiddenBoxFilter = !this.hiddenBoxFilter;
    },
    callBoxFilter2(): void {
      this.hiddenBoxFilter2 = !this.hiddenBoxFilter2;
      this.hiddenBoxFilter3 = false;
    },
    callBoxFilter3(): void {
      this.hiddenBoxFilter3 = !this.hiddenBoxFilter3;
      this.hiddenBoxFilter2 = false;
    },
    searchGenre(movie: string) {
      this.$store.state.Movies.actualTag = movie;
      if (this.FilterSeries === false) {
        this.$store.dispatch('Movies/getMovieFilter', {
          field: 'genres',
          search: movie,
        });
        this.$store.state.Movies.IsMovieGenre = true;
        this.hiddenBoxFilter = !this.hiddenBoxFilter;
      } else {
        this.$store.dispatch('Movies/getSeries', {
          field: 'genres',
          search: movie,
        });
        this.$store.state.Movies.IsSeriesGenre = true;
        this.hiddenBoxFilter = !this.hiddenBoxFilter;
      }
    },
    order(Mynumber: number) {
      this.$store.state.Movies.IsSeriesGenre = false;
      this.$store.state.Movies.IsMovieGenre = false;
      if (this.FilterSeries === false) {
        this.$store.dispatch('Movies/getMovieFilter', {
          sortValue: Mynumber,
        });
        this.hiddenBoxFilter = !this.hiddenBoxFilter;
      } else {
        this.$store.dispatch('Movies/getSeries', {
          sortValue: Mynumber,
        });
        this.hiddenBoxFilter = !this.hiddenBoxFilter;
      }
    },
  },
  mounted(){
     const filter: any = this.$refs.filters;
      document.addEventListener('click', (e) => {
      if (filter !== undefined && filter.contains(e.target) === false) {
        this.hiddenBoxFilter = false;
        this.hiddenBoxFilter2 = false;
        this.hiddenBoxFilter3 = false;

      }
    });
  }
});
</script>
<style lang="scss" scoped></style>
