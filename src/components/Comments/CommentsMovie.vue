<template>
  <div>
    <!-- comentarios principais -->
    <div
      class="comments-container"
      v-for="comment in renderComments.commentsMovie"
      :key="comment.id"
    >
      <b-row class="pb-4" v-if="!comment.isReply">
        <div class="avatar-container">
          <img
            :src="
              '/img/' +
              (comment.userAvatar !== undefined
                ? comment.userAvatar
                : 'user-default.png')
            "
          />
        </div>
        <div class="content-fields-comments">
          <b-col class="p-0">
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
            <div class="pt-3 d-flex justify-content-between info-comments">
              <h6 class="text-color date-time">
                {{
                  new Date(comment.date).toLocaleString().slice(0, 10) +
                  '\xa0' +
                  new Date(comment.date).toLocaleString().slice(11, 17)
                }}
              </h6>
              <div
                class="d-flex info-comments-contents"
                v-if="btnViewsComments && teste != comment._id"
              >
                <div
                  class="items-color comp-icons d-flex justify-content-between pe-2"
                >
                  <div>
                    <p>
                      {{ comment.like }}
                    </p>
                  </div>
                  <Icon
                    :icon="
                      idCommentLike === comment._id && likeComment
                        ? 'carbon:thumbs-up-filled'
                        : 'carbon:thumbs-up'
                    "
                    class="like-icon"
                    @click="LikeComment(comment._id)"
                  />
                  <div>
                    <p>
                      {{ comment.deslike }}
                    </p>
                  </div>
                  <Icon
                    :icon="
                      DeslikeComment &&
                      idCommentLike === comment._id &&
                      DeslikeComment
                        ? 'carbon:thumbs-down-filled'
                        : 'carbon:thumbs-down'
                    "
                    class="like-icon"
                    @click="UnlikeComment(comment._id)"
                  />
                </div>
                <div class="d-flex">
                  <h6
                    class="text-response pe-2"
                    @click="ViewResponses(comment._id)"
                  >
                    {{
                      responseComment && id === comment._id && responseComment
                        ? 'Ocultar respostas'
                        : 'Ver respostas'
                    }}
                  </h6>
                  <h6
                    class="text-response"
                    @click.prevent="getcomment(comment._id)"
                  >
                    {{
                      responseView && id === comment._id && responseView
                        ? 'Ocultar'
                        : 'Responder'
                    }}
                  </h6>
                </div>
              </div>
              <div
                class="btnsEdit"
                v-if="!editComment && teste === comment._id"
              >
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
        </div>
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
            <b-row class="response-reply">
              <b-col
                class="d-flex justify-content-end align-items-start"
                cols="2"
              >
                <b-avatar
                  :src="
                    '/img/' +
                    (reply.userAvatar !== undefined
                      ? reply.userAvatar
                      : 'user-default.png')
                  "
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
                    <div>
                      <p>
                        {{ reply.like }}
                      </p>
                    </div>
                    <Icon
                      :icon="
                        idCommentLike === reply._id && likeComment
                          ? 'carbon:thumbs-up-filled'
                          : 'carbon:thumbs-up'
                      "
                      class="like-icon"
                      @click="LikeComment(reply._id)"
                    />
                    <div>
                      <p>
                        {{ reply.deslike }}
                      </p>
                    </div>
                    <Icon
                      :icon="
                        DeslikeComment &&
                        idCommentLike === reply._id &&
                        DeslikeComment
                          ? 'carbon:thumbs-down-filled'
                          : 'carbon:thumbs-down'
                      "
                      class="like-icon"
                      @click="UnlikeComment(reply._id)"
                    />
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
        <b-col cols="12">
          <div
            class="p-4 d-flex justify-content-center plot-title"
            v-if="
              this.$store.state.Comments.GetCommentResponse.response < [0] &&
              responseComment &&
              id === comment._id
            "
          >
            Nenhuma resposta encontrada
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
                <b-avatar
                  :src="avatar ? avatar : Noavatar"
                  size="5rem"
                ></b-avatar>
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
                <div
                  class="d-flex justify-content-end"
                  @click="$emit('redirect')"
                >
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
          <b-avatar
            :src="
              this.$store.state.Users.UserName &&
              this.$store.state.Users.UserAvatar !== ''
                ? this.avatar
                : this.Noavatar
            "
            size="5rem"
          ></b-avatar>
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
import { SocketModule } from '@/services/socket';

export default defineComponent({
  components: {
    Icon,
  },
  emits: ['postComment', 'deleteComment', 'cancelEdit', 'redirect', 'saveEdit'],
  setup() {
    return {
      socketService: SocketModule.connect(),
    };
  },
  data() {
    return {
      responseComment: false,
      responseView: false,
      editComment: true,
      likeComment: false,
      DeslikeComment: false,
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
        date: new Date(),
      },
      userlike: {
        commentId: '',
        userLike: [
          {
            userId: '',
            like: true,
            unlike: false,
          },
        ],
      },
      Noavatar: '/img/user-default.png',
      avatar: '/img/' + this.$store.state.Users.UserAvatar,
      id: '',
      teste: '',
      idCommentLike: '',
      limit: 5,
      IconStyle: 'carbon:thumbs-up',
      ColorStyle: 'none',
    };
  },
  props: {
    renderComments: {
      type: Object,
      required: false,
    },
    likesComments: {
      type: Array,
      required: false,
    },
    viewMore: {
      type: Function,
      required: false,
    },
  },
  methods: {
    // tratamento para botao like
    LikeComment(commentId: string) {
      this.likeComment = !this.likeComment;
      this.DeslikeComment = false;
      this.idCommentLike = commentId;
<<<<<<< HEAD
  
=======
>>>>>>> release/week-four
      if (this.likeComment === true) {
        this.PostLike(commentId);
      } else if (this.likeComment === false) {
        this.RemoveLike(commentId);
      }
    },
    // adicionar like
    PostLike(commentId: string) {
      this.likeComment = true;
      this.DeslikeComment = false;
      (this.userlike.commentId = commentId),
        (this.userlike.userLike[0].userId = this.$store.state.Users.UserId);
      (this.userlike.userLike[0].like = true),
        (this.userlike.userLike[0].unlike = false),
        this.$store.dispatch('createLikeComment', this.userlike);
    },
    // remover like
    RemoveLike(commentId: string) {
      this.likeComment = false;
      this.DeslikeComment = false;
      (this.userlike.commentId = commentId),
        (this.userlike.userLike[0].userId = this.$store.state.Users.UserId);
      (this.userlike.userLike[0].like = false),
        (this.userlike.userLike[0].unlike = false),
        this.$store.dispatch('createLikeComment', this.userlike);
    },
    // tratamento para botao deslike
    UnlikeComment(commentId: string) {
      this.DeslikeComment = !this.DeslikeComment;
      this.likeComment = false;
      this.idCommentLike = commentId;
      if (this.DeslikeComment === true) {
        this.PostDeslike(commentId);
      } else if (this.DeslikeComment === false) {
        this.RemoveDeslike(commentId);
      }
    },
    PostDeslike(commentId: string) {
      this.DeslikeComment = true;
      this.likeComment = false;
      (this.userlike.commentId = commentId),
        (this.userlike.userLike[0].userId = this.$store.state.Users.UserId);
      (this.userlike.userLike[0].like = false),
        (this.userlike.userLike[0].unlike = true),
        this.$store.dispatch('createLikeComment', this.userlike);
    },
    RemoveDeslike(commentId: string) {
      this.DeslikeComment = false;
      this.likeComment = false;
      (this.userlike.commentId = commentId),
        (this.userlike.userLike[0].userId = this.$store.state.Users.UserId);
      (this.userlike.userLike[0].like = false),
        (this.userlike.userLike[0].unlike = false),
        this.$store.dispatch('createLikeComment', this.userlike);
    },
    getcomment(commentId: string) {
      this.responseView = !this.responseView;
      this.userReply.commentReply = commentId;
      this.id = commentId;
    },
    responseComments() {
      this.$store.dispatch('Comments/createComment', this.userReply);
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
    },
    cancelEdit() {
      this.editComment = true;
      this.teste = '';
    },
  },

  mounted() {
    this.socketService.registerListener('new-comment', 'new-comment', () => {
      this.responseComments();
    });

    this.socketService.registerListener(
      'new-liked',
      'new-liked',
      (commentId) => {
        this.LikeComment(commentId);
      },
    );
  },
});
</script>
<style lang="scss" scoped></style>
