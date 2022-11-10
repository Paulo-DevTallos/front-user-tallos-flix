<template>
  <!--timestamp-->
  <h6>{{ data_timestamp }}</h6>
  <!--like e dislike-->
  <div class="d-flex info-comments-content">
    <div class="items-color comp-icons d-flex justify-content-between pe-2">
      <div>
        <p>{{ data_statuslike }}</p>
      </div>
      <Icon
        :icon="data_like"
        class="like-icon"
        @click="$emit('createlikeComment')"
      />
    </div>
    <div class="items-color comp-icons d-flex justify-content-between pe-2">
      <div>
        <p>{{ data_statusdislike }}</p>
      </div>
      <Icon
        :icon="data_dislike"
        class="like-icon"
        @click="$emit('createdislikeComment')"
      />
    </div>
    <!--view reply and reply-->
    <div class="d-flex">
      <h6 @click="$emit('hiddenReply')">{{ data_reply }}</h6>
      <h6 @click="$emit('getReply')">{{ data_getreply }}</h6>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Icon } from '@iconify/vue';

export default defineComponent({
  name: 'DisplayInteractionInfos',
  components: { Icon },
  emits: [
    'createlikeComment',
    'createdislikeComment',
    'hiddenReply',
    'getReply',
  ],
  props: {
    data_timestamp: {
      type: String,
    },
    data_statuslike: {
      type: String,
    },
    data_statusdislike: {
      type: String,
    },
    data_like: {
      type: String,
    },
    data_dislike: {
      type: String,
    },
    data_reply: {
      type: String,
    },
    data_getreply: {
      type: String,
    },
  },
});
</script>
