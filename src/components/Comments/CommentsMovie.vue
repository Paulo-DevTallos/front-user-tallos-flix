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
          <Avatar
            :source_data="
              '/img/' +
              (comment.userAvatar !== undefined
                ? comment.userAvatar
                : 'user-default.png')
            "
          />
        </div>
        <div class="content-fields-comments">
          <b-col class="p-0">
            <h5 class="text-color">
              {{ comment.name }}
            </h5>
            <TextAreaField
              class="comment-text"
              :data_reply_id="
                (editComment && teste !== comment._id) ||
                (!editComment && teste !== comment._id)
              "
              :rows="3"
              :max_rows="8"
              v-model:model-value="comment.text"
            />
            <div class="pt-3 d-flex justify-content-between info-comments">
              <DisplayInteractionInfos
                class="text-color"
                :data_timestamp="
                  new Date(comment.date).toLocaleString().slice(0, 10) +
                  '\xa0' +
                  new Date(comment.date).toLocaleString().slice(11, 17)
                "
                v-if="btnViewsComments && teste != comment._id"
                :data_statuslike="comment.like"
                :data_statusdislike="comment.deslike"
                :data_like="
                  (idCommentLike === comment._id && likeComment) ||
                  (this.$store.state.Likes.likeList[
                    renderComments.commentsMovie.indexOf(comment)
                  ] === 'LIKE' &&
                    LikeComment !== false)
                    ? 'carbon:thumbs-up-filled'
                    : 'carbon:thumbs-up'
                "
                @createlikeComment="LikeComment(comment._id)"
                :data_dislike="
                  DeslikeComment &&
                  idCommentLike === comment._id &&
                  DeslikeComment
                    ? 'carbon:thumbs-down-filled'
                    : 'carbon:thumbs-down'
                "
                @createdislikeComment="UnlikeComment(comment._id)"
                :data_reply="
                  responseComment && id === comment._id && responseComment
                    ? 'Ocultar respostas'
                    : 'Ver respostas'
                "
                @hiddenReply="ViewResponses(comment._id)"
                :data_getreply="
                  responseView && id === comment._id && responseView
                    ? 'Ocultar'
                    : 'Responder'
                "
                @getReply="getcomment(comment._id)"
              />
              <!--botoes de editacao do comentario principal-->
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
        <div class="modal-actions">
          <ModalOptionsComment
            v-if="comment.email === this.$store.state.Users.UserEmail"
            @edit="editComments(comment._id)"
            @delete="$emit('deleteComment', comment._id)"
          />
        </div>
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
                <Avatar
                  :src="
                    '/img/' +
                    (reply.userAvatar !== undefined
                      ? reply.userAvatar
                      : 'user-default.png')
                  "
                />
              </b-col>
              <b-col cols="9" class="p-0">
                <h5 class="text-color">{{ reply.name }}</h5>
                <TextAreaField
                  class="comment-text"
                  :data_reply_id="
                    (editComment && teste !== reply._id) ||
                    (!editComment && teste !== reply._id)
                  "
                  :rows="3"
                  :max_rows="8"
                  v-model:model-value="reply.text"
                />
                <div class="pt-3 d-flex justify-content-between">
                  <DisplayInteractionInfos
                    class="text-color date-time"
                    :data_timestamp="
                      new Date(comment.date).toLocaleString().slice(0, 10) +
                      '\xa0' +
                      new Date(comment.date).toLocaleString().slice(11, 17)
                    "
                    v-if="btnViewsComments && teste != reply._id"
                    :data_statuslike="reply.like"
                    :data_statusdislike="reply.deslike"
                    :data_like="
                      idCommentLike === reply._id && likeComment
                        ? 'carbon:thumbs-up-filled'
                        : 'carbon:thumbs-up'
                    "
                    @createlikeComment="LikeComment(reply._id)"
                    :data_dislike="
                      DeslikeComment &&
                      idCommentLike === reply._id &&
                      DeslikeComment
                        ? 'carbon:thumbs-down-filled'
                        : 'carbon:thumbs-down'
                    "
                    @createdislikeComment="UnlikeComment(reply._id)"
                  />
                  <!--botoes de editacao do comentario de respostas-->
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
                <ModalOptionsComment
                  v-if="reply.email === this.$store.state.Users.UserEmail"
                  @edit="editComments(reply._id)"
                  @delete="$emit('deleteComment', reply._id)"
                />
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
        <!-- Responder Comentário transformar toda essa estrutura em um componente-->
        <!--<b-col cols="12" v-if="responseView && id === comment._id">
          <BoxComment 
            :data_avatar_source="avatar ? avatar : Noavatar"
            :rows="5"
            :max_lenght="200"
            v-model:model-value="userReply.text"
            :data_lenght_count="userReply.text.length"
            @redirect="$emit('redirectReq')"
            @commentFlow="responseComments"
          />
        </b-col>-->
        <b-col cols="12" v-if="responseView && id === comment._id">
          <div class="w-100 d-flex justify-content-end">
            <b-row class="response-coment">
              <b-col
                class="d-flex justify-content-end align-items-start"
                cols="2"
              >
                <Avatar :src="avatar ? avatar : Noavatar" />
              </b-col>
              <b-col>
                <h5 class="text-color">Seu Comentário</h5>
                <TextAreaField
                  class="comment-text"
                  v-model="userReply.text"
                  :rows="5"
                  :max_lenght="200"
                  placeholder="Digite aqui um comentário"
                />
                <div class="pt-3 d-flex justify-content-end">
                  <h6 class="text-color">{{ userReply.text.length }}/200</h6>
                </div>
                <div
                  class="d-flex justify-content-end"
                  @click="$emit('redirectReq')"
                >
                  <ButtonDefault
                    :data_btn_title="'Comentar'"
                    @btnAction="responseComments"
                  />
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
          <TextAreaField
            class="comment-text"
            v-model="userComent.text"
            :rows="5"
            :max_lenght="200"
            placeholder="Digite aqui um comentário"
          />
          <div class="pt-3 d-flex justify-content-end">
            <h6 class="text-color">{{ userComent.text.length }}/200</h6>
          </div>
          <div
            class="d-flex justify-content-center"
            @click="$emit('redirectReq')"
          >
            <ButtonDefault
              :data_btn_title="'Comentar'"
              @btnAction="$emit('postComment', userComent)"
            />
          </div>
        </b-col>
      </b-row>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { SocketModule } from '@/services/socket';
import Avatar from '../Avatars/Avatar.vue';
import TextAreaField from './TextAreaField.vue';
import DisplayInteractionInfos from './DisplayInteractionInfos.vue';
import ModalOptionsComment from '@/components/Modals/ModalOptionsComment.vue';
import ButtonDefault from '@/components/Buttons/ButtonDefault.vue';
//import BoxComment from './BoxComment.vue';

export default defineComponent({
  components: {
    Avatar,
    TextAreaField,
    DisplayInteractionInfos,
    ModalOptionsComment,
    ButtonDefault,
    //BoxComment,
  },
  emits: [
    'postComment',
    'deleteComment',
    'cancelEdit',
    'redirectReq',
    'saveEdit',
  ],
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
        user_Id: this.$store.state.Users.UserName.UserId,
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
    },
    cancelEdit() {
      this.editComment = true;
      this.teste = '';
    },
  },

  async mounted() {
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
    for (
      let index = 0;
      index < this.renderComments.commentsMovie.length;
      index++
    ) {
      if (index !== this.$store.state.Likes.likeList.length) {
        this.$store.state.Likes.likeList = [];
      }
      await this.$store.dispatch('getAllLikesComment', {
        id: this.renderComments.commentsMovie[index]._id,
        userId: {
          userId: this.$store.state.Users.UserId,
        },
      });
    }
  },
});
</script>
<style lang="scss" scoped></style>
