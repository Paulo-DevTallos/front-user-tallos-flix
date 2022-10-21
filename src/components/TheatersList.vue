<template>
  <div class="theaters-form-container">
    <p class="plot-title mt-4">Lista de cinemas perto de você</p>
    <hr class="orange-line-separator" />
    <ul class="theaters-list d-flex flex-column">
      <li class="theaters-item">
        Cinema São Luis End: Rua Alberto 124- Centro
      </li>
      <li class="theaters-item">
        Cinema Benfica End AV. 13 de maio 457- Benfica
      </li>
      <li class="theaters-item">
        Cinema North Shopping End: Av. Antônio Bezarra 5412 - Pres. Kennedy
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
