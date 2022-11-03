<template>
  <div>
    <!-- comentarios principais -->
    <div v-for="comment in renderComments.commentsMovie" :key="comment.id">
      <b-row class="pb-4" v-if="!comment.isReply">
        <b-col class="d-flex justify-content-end align-items-center" cols="2"
          ><b-avatar
            v-if="comment.avatar ? comment.avatar : Noavatar"
            :src="comment.avatar || Noavatar"
            size="5rem"
          ></b-avatar
        ></b-col>
        <b-col cols="9" class="p-0">
          <h5 class="text-color">{{ comment.name }}</h5>
          <b-form-textarea
            class="comment-text"
            no-resize
            :plaintext="
              (editComment && teste !== comment._id) ||
              (!editComment && teste !== comment._id)
            "
            rows="3"
            max-rows="4"
            v-model:model-value="comment.text"
          ></b-form-textarea>
          <div class="pt-3 d-flex justify-content-between">
            <h6 class="text-color">{{ comment.date }}</h6>
            <div class="d-flex" v-if="btnViewsComments && teste != comment._id">
              <div
                class="items-color comp-icons d-flex justify-content-between pe-2"
              >
                <p>5</p>
                <Icon icon="carbon:thumbs-up" class="like-icon" />
                <Icon icon="carbon:thumbs-down" class="like-icon" />
              </div>
              <div class="d-flex">
                <h6
                  class="text-response pe-2"
                  @click="ViewResponses(comment._id)"
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
            <div class="btnsEdit" v-if="!editComment && teste === comment._id">
              <b-button block squared @click.prevent="cancelEdit"
                >Cancelar</b-button
              >
              <b-button
                block
                squared
                class="saveBE"
                @click="$emit('saveEdit', comment)"
                >Salvar</b-button
              >
            </div>
          </div>
        </b-col>
        <b-col
          class="p-0 m-0 text-color"
          v-if="comment.email === this.$store.state.Users.UserEmail"
        >
          <div class="d-flex justify-content-start align-items-center actions">
            <b-dropdown variant="link" dropright no-caret>
              <template #button-content>
                <Icon icon="carbon:overflow-menu-vertical" class="icon-menu" />
              </template>
              <b-dropdown-item @click="editComments(comment._id)"
                ><Icon
                  icon="carbon:edit"
                  class="iconDrop"
                />Editar</b-dropdown-item
              >
              <b-dropdown-item
                @click.prevent="$emit('deleteComment', comment._id)"
                ><Icon
                  icon="carbon:delete"
                  class="iconDrop"
                />Deletar</b-dropdown-item
              >
            </b-dropdown>
          </div>
        </b-col>
        <!-- Respostas do Comentário -->
        <b-col cols="12" v-if="responseComment && id === comment._id">
          <div
            v-for="reply in this.$store.state.Comments.GetCommentResponse
              .response"
            :key="reply.id"
            class="w-100 d-flex justify-content-end"
          >
            <b-row class="response-coment">
              <b-col
                class="d-flex justify-content-end align-items-start"
                cols="2"
              >
                <b-avatar
                  :src="reply.avatar ? reply.avatar : Noavatar"
                  size="5rem"
                ></b-avatar>
              </b-col>
              <b-col cols="9" class="p-0">
                <h5 class="text-color">{{ reply.name }}</h5>
                <b-form-textarea
                  class="comment-text"
                  no-resize
                  :plaintext="
                    (editComment && teste !== reply._id) ||
                    (!editComment && teste !== reply._id)
                  "
                  rows="3"
                  max-rows="8"
                  v-model:model-value="reply.text"
                ></b-form-textarea>
                <div class="pt-3 d-flex justify-content-between">
                  <h6 class="text-color">{{ reply.date }}</h6>
                  <div
                    class="items-color comp-icons d-flex justify-content-between pe-2"
                    v-if="btnViewsComments && teste != reply._id"
                  >
                    <p>5</p>
                    <Icon icon="carbon:thumbs-up" class="like-icon" />
                    <Icon icon="carbon:thumbs-down" class="like-icon" />
                  </div>
                  <div
                    class="btnsEditR"
                    v-if="!editComment && teste === reply._id"
                  >
                    <b-button block squared @click.prevent="cancelEdit"
                      >Cancelar</b-button
                    >
                    <b-button
                      block
                      squared
                      class="saveBE"
                      @click="$emit('saveEdit', reply)"
                      >Salvar</b-button
                    >
                  </div>
                </div>
              </b-col>
              <b-col
                class="p-0 m-0 text-color"
                v-if="reply.email === this.$store.state.Users.UserEmail"
              >
                <div
                  class="d-flex justify-content-start align-items-center actions"
                >
                  <b-dropdown variant="link" dropright no-caret>
                    <template #button-content>
                      <Icon
                        icon="carbon:overflow-menu-vertical"
                        class="icon-menu"
                      />
                    </template>
                    <b-dropdown-item @click="editComments(reply._id)"
                      ><Icon
                        icon="carbon:edit"
                        class="iconDrop"
                      />Editar</b-dropdown-item
                    >
                    <b-dropdown-item
                      @click.prevent="$emit('deleteComment', reply._id)"
                      ><Icon
                        icon="carbon:delete"
                        class="iconDrop"
                      />Deletar</b-dropdown-item
                    >
                  </b-dropdown>
                </div>
              </b-col>
            </b-row>
          </div>
          <div
            v-if="this.$store.state.Comments.GetCommentResponse.response > []"
            class="d-flex justify-content-end ViewMoreResponse"
          >
            <p class="text-color viewmore" @click="viewMoreResponse">
              Mostrar Mais
            </p>
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
                  v-model="userReply.text"
                  maxlength="200"
                  rows="5"
                  placeholder="Digite aqui um comentário"
                  no-resize
                ></b-form-textarea>
                <div class="pt-3 d-flex justify-content-end">
                  <h6 class="text-color">{{ userReply.text.length }}/200</h6>
                </div>
                <div class="d-flex justify-content-end">
                  <b-button
                    size="lg"
                    class="btn-comment"
                    @click="responseComments"
                    >Comentar</b-button
                  >
                </div>
              </b-col>
            </b-row>
          </div>
        </b-col>
      </b-row>
    </div>
    <!-- pagination -->
    <div
      v-if="renderComments.commentsMovie > []"
      class="d-flex justify-content-end"
    >
      <p class="text-color viewmore" @click="viewMore">Mostrar Mais</p>
    </div>
    <!-- Comentar -->
    <div>
      <b-row class="boxYourComment">
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
          <div class="d-flex justify-content-center" @click="$emit('redirect')">
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
  emits: ['postComment', 'deleteComment', 'cancelEdit', 'redirect', 'saveEdit'],
  data() {
    return {
      responseComment: false,
      responseView: false,
      editComment: true,
      btnViewsComments: true,
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
        isReply: true,
        commentReply: '',
        // commentReply: this.$store.state.Comments.CommentUnique,
        date: new Date(),
      },
      editCommentUser: {
        text: '',
      },
      response: 'Responder',
      ocult: 'Ocultar',
      Noavatar: '/img/user-default.png',
      id: '',
      teste: '',
      limit: 5,
    };
  },
  props: {
    renderComments: {
      type: Object,
      required: false,
    },
    viewMore: {
      type: Function,
      required: false,
    },
  },
  methods: {
    getcomment(commentId: string) {
      this.responseView = !this.responseView;
      this.userReply.commentReply = commentId;
      this.id = commentId;
    },
    responseComments() {
      this.$store.dispatch('Comments/createComment', this.userReply);
      console.log(this.userReply);
      this.userReply.text = '';
      (this.id = ''), (this.responseView = false);
    },
    ViewResponses(commentId: string) {
      this.responseComment = !this.responseComment;
      this.id = commentId;
      this.$store.dispatch('Comments/getResponseComments', {
        idcomment: commentId,
        params: { limit: this.limit },
      });
    },
    viewMoreResponse() {
      this.responseComment = true;
      this.limit = this.limit + 5;
      this.$store.dispatch('Comments/getResponseComments', {
        idcomment: this.id,
        params: { limit: this.limit },
      });
    },
    editComments(commentId: string) {
      this.teste = commentId;
      this.editComment = false;
      console.log(this.editComment);
    },
    cancelEdit() {
      this.editComment = true;
      this.teste = '';
    },
  },
});
</script>
<style lang="scss" scoped></style>
