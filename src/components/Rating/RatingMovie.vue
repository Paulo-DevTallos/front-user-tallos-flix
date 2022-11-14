<template>
  <div class="theaters-form-container">
    <p class="plot-title ps-5 mt-4">Avalie este Filme</p>
    <hr class="orange-line-separator" />
    <div class="d-flex flex-column align-items-center">
      <p class="avaliationTitle m-2">Avaliação</p>
      <div class="d-flex">
        <star-rating v-model="avaliation" :showControl="true" />
      </div>
      <div>
        <button-default
          class="BtnSalvar"
          :data_btn_title="'Salvar'"
          @btnAction="SaveRating"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import ButtonDefault from '../Buttons/ButtonDefault.vue';
import StarRating from './StarRating.vue';

export default defineComponent({
  components: { StarRating, ButtonDefault },
  data() {
    return {
      avaliation: 0,
    };
  },
});
</script>
<style lang="scss" scoped></style>
