<template>
  <div class="card-fluid card-config">
    <div class="poster-container">
      <div class="poster-wd">
        <img src="/img/img1.png" alt="">
      </div>
      <div class="available-field">
        <span>Avaliação</span>
      </div>
    </div>
    <div class="info-movie">
      <header class="card-header">
        <h2>Conteudo do card</h2>
        <span>Gênero</span>
        <p>Duração: 2h5min</p>
        <div class="icon-favorite">
          <Icon icon="carbon:favorite" />
          <p id="tag-favorite">Salvar na minha lista</p>
        </div>
      </header>
      <div class="card-technics">
        <ul>
          <li>Diretor: <span>Matt Reeves</span></li>
          <li>Roteiro: <span>Peter Craig</span></li>  <!--verificar se é uma li -->
          <li>Elenco: <span>Robert Pattinson, Zoe Kravit</span></li>
          <li>Titulo Original: The Batman</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Icon } from '@iconify/vue';

export default defineComponent({
  name: 'CardMovie',
  components: { Icon },
});
</script>

<style lang="scss" scoped></style>
