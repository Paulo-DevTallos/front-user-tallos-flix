<template>
  <b-col class="p-0 m-0 text-color">
    <div class="d-flex justify-content-start align-items-center actions">
      <b-dropdown variant="link" dropright no-caret>
        <template #button-content>
          <Icon icon="carbon:overflow-menu-vertical" class="icon-menu" />
        </template>
        <b-dropdown-item @click="$emit('edit')">
          <Icon icon="carbon:edit" class="iconDrop" />Editar
        </b-dropdown-item>
        <b-dropdown-item @click="$emit('delete')">
          <Icon icon="carbon:delete" class="iconDrop"/>Deletar
        </b-dropdown-item>
      </b-dropdown>
    </div>
  </b-col>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Icon } from '@iconify/vue';

export default defineComponent({
  name: 'ModalOptionsComment',
  components: { Icon },
  emits: ['edit', 'delete'],
});
</script>

