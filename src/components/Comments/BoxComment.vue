<template>
  <div class="w-100 d-flex justify-content-end">
    <b-row class="response-comment">
      <b-col class="d-flex justify-content-end align-items-start" cols="2">
        <Avatar :data_source="data_avatar_source" />
      </b-col>
      <b-col>
        <h5>Seu Comentário</h5>
        <TextAreaField
          class="comment-text"
          no-resize
          placeholder="Digite aqui um comentário"
          :rows="rows"
          maxLenght="max_lenght"
        />
        <div>
          <h6>{{ data_lenght_count }}/200</h6>
        </div>
        <div class="d-flex justify-content-end" @click="$emit('redirect')">
          <ButtonDefault 
            :data_btn_title="'Comentar'" 
            @btnAction="$emit('commentFlow')"
          />
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Avatar from '../Avatars/Avatar.vue';
import TextAreaField from './TextAreaField.vue';
import ButtonDefault from '@/components/Buttons/ButtonDefault.vue';

export default defineComponent({
  name: 'BoxComment',
  components: { Avatar, TextAreaField, ButtonDefault },
  emits: ['redirect', 'commentFlow'],
  props: {
    data_avatar_source: {
      type: String,
    },
    rows: {
      type: Number,
    },
    max_lenght: {
      type: Number,
    },
    data_lenght_count: {
      type: [Number],
    },
  },
});
</script>
