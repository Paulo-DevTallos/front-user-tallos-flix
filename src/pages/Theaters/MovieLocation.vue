<template>
  <div class="page-container">
    <CardMovie :hiddenBtnTrailer="true" />
    <div>
      <PlotView />
      <TheatersForm />
    </div>
    <div class="map-location-field">
      <MapView />
    </div>
    <div>
      <TheatersList />
    </div>
    <div class="comments-app">
      <p class="ps-5 plot-title mt-4">Comentários</p>
      <hr class="orange-line-separator" />
      <div
        class="p-4 d-flex justify-content-center plot-title"
        v-if="this.$store.state.Comments.Comments.commentsMovie < [0]"
      >
        Nenhum comentário encontrado
      </div>
      <comments-movie
        :renderComments="this.$store.state.Comments.Comments"
        @redirect="redirectAction"
        @postComment="commentPost"
        @deleteComment="deleteComment"
        @saveEdit="updateComment"
        :viewMore="pageChange"
        :likesComments="likes"
        class="comments-comp"
      />
      <OptionsModal
        v-if="hiddenOptionModal"
        :hiddenBtnLogin="true"
        @closeWindow="closeOptionModal"
        :action="message"
      />
    </div>
  </div>
</template>

<script lang="ts">
import CardMovie from '@/components/Cards/CardMovie.vue';
import CommentsMovie from '@/components/Comments/CommentsMovie.vue';
import MapView from '@/components/Map.vue';
import OptionsModal from '@/components/Modals/OptionsModal.vue';
import PlotView from '@/components/Plot.vue';
import TheatersForm from '@/components/TheatersForm.vue';
import TheatersList from '@/components/TheatersList.vue';
import { SocketModule } from '@/services/socket';
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'LocationView',
  components: {
    CardMovie,
    PlotView,
    TheatersForm,
    MapView,
    TheatersList,
    CommentsMovie,
    OptionsModal,
  },
  setup() {
    return {
      socketService: SocketModule.connect(),
    };
  },
  data() {
    return {
      message: 'Você precisa está logado para realizar está ação!',
      limit: 5,
      isLogged: localStorage.getItem('token'),
      hiddenOptionModal: false,
      likes: [],
      userId: {
        userId: this.$store.state.Users.UserId,
      },
      movie: {
        movie: this.$store.state.Movies.currentMovie._id,
      },
    };
  },
  methods: {
    redirectAction(): void {
      if (!this.isLogged) {
        this.hiddenOptionModal = true;
      } else {
        this.commentsRender();
      }
    },
    closeOptionModal() {
      this.hiddenOptionModal = false;
    },
    async commentsRender() {
      await this.$store.dispatch('Comments/getByMovieId', {
        movie: this.movie,
        params: {
          limit: this.limit,
        },
      });

      // for (
      //   let index = 0;
      //   index < this.$store.state.Comments.Comments.commentsMovie.length;
      //   index++
      // ) {
      //   await this.$store.dispatch('getAllLikesComment', {
      //     id: this.$store.state.Comments.Comments.commentsMovie[index]._id,
      //     userId: this.userId,
      //   });
      //   await this.likes.push(this.$store.state.Likes.getComment);
      // }
    },
    commentPost(userComent: Object) {
      console.log(userComent);
      this.$store.dispatch('Comments/createComment', userComent);

      const cleanInputComment = (userComent.text = '');

      this.commentsRender();

      return cleanInputComment;
    },
    async pageChange() {
      this.limit = this.limit + 5;
      this.commentsRender();
    },
    deleteComment(IdComment: string) {
      this.$store.dispatch('Comments/deleteComment', IdComment);
      this.commentsRender();
    },
    updateComment(commentUpdate: string) {
      this.$store.dispatch('Comments/updateComment', {
        id: commentUpdate._id,
        comment: commentUpdate,
      });
      this.commentsRender();
    },

    closeReplyComment() {
      this;
    },
  },
  mounted() {
    this.socketService.registerListener('new-comment', 'new-comment', () => {
      this.commentsRender();
    });

    this.socketService.registerListener(
      'deleted-comment',
      'deleted-comment',
      (IdComment) => {
        this.deleteComment(IdComment);
      },
    );

    this.socketService.registerListener(
      'update-comment',
      'update-comment',
      (commentUpdate) => {
        this.updateComment(commentUpdate);
      },
    );

    this.commentsRender();
    console.log(this.$store.state.Likes.getComment);
  },
});
</script>
