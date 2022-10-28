<template>
  <div>
    <!-- comentarios principais -->
    <div v-for="comment in renderComments" :key="comment.id">
      <b-row class="pb-4" v-if="!comment.isReply">
        <b-col class="d-flex justify-content-end align-items-center" cols="2"
          ><b-avatar
            v-if="comment.avatar ? comment.avatar : Noavatar"
            :src="comment.avatar || Noavatar"
            size="5rem"
          ></b-avatar
        ></b-col>
        <b-col cols="10">
          <h5 class="text-color">{{ comment.name }}</h5>
          <b-form-textarea
            class="comment-text"
            no-resize
            plaintext
            rows="3"
            max-rows="8"
            :value="comment.text"
            >{{ comment.text }}</b-form-textarea
          >
          <div class="pt-3 d-flex justify-content-between">
            <h6 class="text-color">{{ comment.date }}</h6>
            <div class="d-flex">
              <div
                class="items-color comp-icons d-flex justify-content-between pe-2"
              >
                <p>5</p>
                <Icon icon="carbon:thumbs-up" class="like-icon" />
                <Icon icon="carbon:thumbs-down" class="like-icon" />
              </div>
              <h6
                class="text-response pe-2"
                @click="responseComment = !responseComment"
              >
                Ver respostas
              </h6>
              <h6
                class="text-response"
                @click.prevent="getcomment(comment._id)"
              >
                {{ response }}
              </h6>
            </div>
          </div>
        </b-col>
        <!-- Respostas do Comentário -->
        <b-col cols="12" v-if="responseComment">
          <div
            v-for="reply in comment.comments"
            :key="reply.id"
            class="w-100 d-flex justify-content-end"
          >
            <b-row class="pb-4 response-coment">
              <b-col
                class="d-flex justify-content-end align-items-start"
                cols="2"
              >
                <b-avatar :src="reply.avatar" size="5rem"></b-avatar>
              </b-col>
              <b-col cols="10">
                <h5 class="text-color">{{ reply._id }}</h5>
                <b-form-textarea
                  class="comment-text"
                  no-resize
                  plaintext
                  rows="3"
                  max-rows="8"
                  >{{ reply.text }}</b-form-textarea
                >
                <div class="pt-3 d-flex justify-content-between">
                  <h6 class="text-color">Há {{ reply.date }} dia</h6>
                  <div
                    class="items-color comp-icons d-flex justify-content-between pe-2"
                  >
                    <p>5</p>
                    <Icon icon="carbon:thumbs-up" class="like-icon" />
                    <Icon icon="carbon:thumbs-down" class="like-icon" />
                  </div>
                </div>
              </b-col>
            </b-row>
          </div>
        </b-col>
        <!-- Responder Comentário -->
        <b-col cols="12" v-if="responseView && id === comment._id">
          <div class="w-100 d-flex justify-content-end">
            <b-row class="response-coment">
              <b-col
                class="d-flex justify-content-end align-items-start"
                cols="2"
              >
                <b-avatar src="/img/avatar1.png" size="5rem"></b-avatar>
              </b-col>
              <b-col>
                <h5 class="text-color">Seu Comentário</h5>
                <b-form-textarea
                  class="comment-text"
                  v-model="userComent.text"
                  maxlength="200"
                  rows="5"
                  placeholder="Digite aqui um comentário"
                  no-resize
                ></b-form-textarea>
                <div class="pt-3 d-flex justify-content-end">
                  <h6 class="text-color">{{ userComent.text.length }}/200</h6>
                </div>
                <div class="d-flex justify-content-end">
                  <b-button size="lg" class="btn-comment">Comentar</b-button>
                </div>
              </b-col>
            </b-row>
          </div>
        </b-col>
      </b-row>
    </div>
    <!-- Comentar -->
    <div>
      <b-row>
        <b-col class="d-flex justify-content-end align-items-start" cols="2">
          <b-avatar src="/img/avatar1.png" size="5rem"></b-avatar>
        </b-col>
        <b-col>
          <h5 class="text-color">Seu Comentário</h5>
          <b-form-textarea
            class="comment-text"
            v-model="userComent.text"
            maxlength="200"
            rows="5"
            placeholder="Digite aqui um comentário"
            no-resize
          ></b-form-textarea>
          <div class="pt-3 d-flex justify-content-end">
            <h6 class="text-color">{{ userComent.text.length }}/200</h6>
          </div>
          <div class="d-flex justify-content-center">
            <b-button
              size="lg"
              class="btn-comment"
              @click="$emit('postComment', userComent)"
              >Comentar</b-button
            >
          </div>
        </b-col>
      </b-row>
    </div>
  </div>
</template>
<script lang="ts">
import { Icon } from '@iconify/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    Icon,
  },
  emits: ['postComment'],
  data() {
    return {
      responseComment: false,
      responseView: false,
      userComent: {
        name: this.$store.state.Users.UserName,
        email: this.$store.state.Users.UserEmail,
        movie_id: this.$store.state.Movies.currentMovie._id,
        text: '',
        likes: null,
        isReply: false,
        comments: [],
        date: new Date(),
      },
      userReply: {
        name: this.$store.state.Users.UserName,
        email: this.$store.state.Users.UserEmail,
        movie_id: this.$store.state.Movies.currentMovie._id,
        text: '',
        likes: null,
        isReply: true,
        comments: [],
        date: new Date(),
      },
      response: 'Responder',
      ocult: 'Ocultar',
      Noavatar: '/img/user-default.png',
      id: '',
    };
  },
  props: {
    renderComments: {
      type: Object,
      required: false,
    },
  },
  methods: {
    getcomment(commentId: string) {
      this.responseView = !this.responseView;
      this.id = commentId;
    },
  },
});
</script>
<style lang="scss" scoped></style>
