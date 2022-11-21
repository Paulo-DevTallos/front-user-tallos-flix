<template>
	<div class="page-container">
		<CardMovie />
		<div v-if="$store.state.Movies.currentMovie.fullplot">
			<PlotView />
		</div>
		<div>
			<rating-movie />
		</div>
		<div class="comments-app">
			<p class="ps-5 plot-title mt-4">Comentários</p>
			<hr class="orange-line-separator" />
			<div
				class="p-4 d-flex justify-content-center plot-title"
				v-if="$store.state.Comments.Comments.commentsMovie < [0]"
			>
				Nenhum comentário encontrado
			</div>
			<comments-movie
				:renderComments="$store.state.Comments.Comments"
				@postComment="commentPost"
				@deleteComment="deleteComment"
				@saveEdit="updateComment"
				@redirectReq="redirectAction"
				:viewMore="pageChange"
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
import { defineComponent } from 'vue';
import CardMovie from '@/components/Cards/CardMovie.vue';
import PlotView from '@/components/Plot.vue';
import CommentsMovie from '@/components/Comments/CommentsMovie.vue';
import OptionsModal from '@/components/Modals/OptionsModal.vue';
import { SocketModule } from '@/services/socket';
import RatingMovie from '@/components/Rating/RatingMovie.vue';

export default defineComponent({
	name: 'MovieView',
	components: { CardMovie, PlotView, CommentsMovie, OptionsModal, RatingMovie },
	setup() {
		return {
			socketService: SocketModule.connect(),
		};
	},
	data() {
		return {
			message: 'Você precisa está logado para realizar está ação!',
			isLogged: localStorage.getItem('token'),
			hiddenOptionModal: false,
			limit: 5,
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
		commentsRender() {
			this.$store.dispatch('Comments/getByMovieId', {
				movie: this.movie,
				params: {
					limit: this.limit,
				},
			});
		},
		commentPost(userComent: Object) {
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
	},
	mounted() {
		this.socketService.registerListener(
			'new-comment',
			'new-comment',
			(userComent) => {
				this.commentPost(userComent);
			},
		);

		this.socketService.registerListener(
			'deleted-comment',
			'deleted-comment',
			(IdComment: string) => {
				this.deleteComment(IdComment);
			},
		);

		this.socketService.registerListener(
			'update-comment',
			'update-comment',
			(commentUpdate: string) => {
				this.updateComment(commentUpdate);
			},
		);
		this.commentsRender();
	},
});
</script>

<style lang="scss" scoped></style>
