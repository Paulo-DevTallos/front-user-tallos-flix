<template>
  <b-collapse id="nav-collapse" is-nav>
    <b-navbar-nav class="d-flex justify-content-between">
      <b-collapse class="d-flex">
        <b-nav-item class="texto-navbar" :to="{ name: 'theaters' }">
          Somente nos Cinemas
        </b-nav-item>
        <b-nav-item :to="{ name: `${movies}` }"> Filmes </b-nav-item>
        <b-nav-item :to="{ name: `${series}` }">Séries</b-nav-item>
      </b-collapse>
    </b-navbar-nav>
  </b-collapse>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MenuMobile',
  props: {
    movies: {
      type: String,
    },
    series: {
      type: String,
    },
  },
});
</script>
