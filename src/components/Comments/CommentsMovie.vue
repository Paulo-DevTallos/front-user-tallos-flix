<template>
  <div>
    <div v-for="comment in renderComments" :key="comment.id">
      <b-row class="pb-4">
        <b-col class="d-flex justify-content-end align-items-center" cols="2"
          ><b-avatar
            v-if="comment.avatar ? comment.avatar : Noavatar"
            :src="comment.avatar || Noavatar"
            size="5rem"
          ></b-avatar
        ></b-col>
        <b-col cols="10">
          <h5 class="text-color">{{ comment.name }}</h5>
          <div class="comment-text">
            <b-card-text>{{ comment.text }}</b-card-text>
          </div>
          <div class="pt-3 d-flex justify-content-between">
            <h6 class="text-color">Há {{ comment.date }} dia</h6>
            <div class="d-flex">
              <div
                class="
                  items-color
                  comp-icons
                  d-flex
                  justify-content-between
                  pe-2
                "
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
              <h6 class="text-response" @click.prevent="getcomment(comment)">
                {{ response }}
              </h6>
            </div>
          </div>
        </b-col>
        <b-col cols="12" v-if="responseComment">
          <div
            v-for="reply in comment.response"
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
                <h5 class="text-color">{{ reply.name }}</h5>
                <div class="comment-text">
                  <b-card>{{ reply.text }}</b-card>
                </div>
                <div class="pt-3 d-flex justify-content-between">
                  <h6 class="text-color">Há {{ reply.date }} dia</h6>
                  <div
                    class="
                      items-color
                      comp-icons
                      d-flex
                      justify-content-between
                      pe-2
                    "
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
        <b-col cols="12" v-if="responseView">
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
                  v-model="text"
                  maxlength="200"
                  rows="5"
                  placeholder="Digite aqui um comentário"
                  no-resize
                ></b-form-textarea>
                <div class="pt-3 d-flex justify-content-end">
                  <h6 class="text-color">{{ text.length }}/200</h6>
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
    <div>
      <b-row>
        <b-col class="d-flex justify-content-end align-items-start" cols="2">
          <b-avatar src="/img/avatar1.png" size="5rem"></b-avatar>
        </b-col>
        <b-col>
          <h5 class="text-color">Seu Comentário</h5>
          <b-form-textarea
            class="comment-text"
            v-model="text"
            maxlength="200"
            rows="5"
            placeholder="Digite aqui um comentário"
            no-resize
          ></b-form-textarea>
          <div class="pt-3 d-flex justify-content-end">
            <h6 class="text-color">{{ text.length }}/200</h6>
          </div>
          <div class="d-flex justify-content-center">
            <b-button size="lg" class="btn-comment">Comentar</b-button>
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
  data() {
    return {
      responseComment: false,
      responseView: false,
      text: '',
      response: 'Responder',
      ocult: 'Ocultar',
      Noavatar: '/img/user-default.png',
      getComments: null,
      comments: [
        {
          id: 1,
          name: 'Maria Menezes',
          text: 'Este Bruce Wayne carrega a memória de sua tragédia familiar de forma muito vívida - é claro que este é um fator determinante para todas as versões mais dramáticas do Batman',
          avatar: '/img/avatar1.png',
          date: 3,
          response: [
            {
              id: 11,
              name: 'Julião',
              text: 'man kakakkakakakakakkakakakak',
              avatar: '/img/empty-img.png',
              date: 1,
            },
            {
              id: 12,
              name: 'Attonio',
              text: 'Concordo',
              avatar: '/img/empty-img.png',
              date: 1,
            },
          ],
        },
        {
          id: 2,
          name: 'Daniel Gomes',
          text: 'Filme sensacional. Foi um dos melhores filmes de heróis que já assisti. Robert Pattinson ficou incrível e combina muito bem com o personagem. Parabéns Matt Reeves!!',
          avatar: '/img/empty-img.png',
          date: 2,
          response: [
            {
              id: 21,
              name: 'Julião',
              text: 'man kakakkakakakakakkakakakak',
              avatar: '/img/empty-img.png',
              date: 1,
            },
          ],
        },
        {
          id: 3,
          name: 'Lara Martins',
          text: 'Não gostei! O longa está com uma vibe muito gótica, lembrando em momento o filme "O Corvo"',
          avatar: '/img/avatar1.png',
          date: 1,
          response: [],
        },
        {
          id: 3,
          name: 'André cardoso',
          text: 'Sombrio e com um toque de loucura, the batman é um dos melhores filme do morcego, mas tbm achei o filme longo demais',
          avatar: '/img/empty-img.png',
          date: 1,
          response: [],
        },
      ],
    };
  },
  props: {
    renderComments: {
      type: Object,
      required: false,
    },
  },
  methods: {
    getcomment(comment) {
      this.getComments = { ...comment };
      this.responseView = !this.responseView;
      console.log('id do comentário', comment._id);
      console.log('id passado para o componente', this.getComments._id);
    },
  },
});
</script>
<style lang="scss" scoped></style>
