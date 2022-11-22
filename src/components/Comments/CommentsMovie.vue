<template>
	<div>
		<!-- comentarios principais -->
		<div v-if="this.renderList === true">
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
							<h5>
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
									:data_timestamp="new Date(comment.date).toLocaleString()"
									v-if="btnViewsComments && teste != comment._id"
									:data_statuslike="comment.like"
									:data_statusdislike="comment.deslike"
									:data_like="
										this.$store.state.Likes.likeList[
											renderComments.commentsMovie.indexOf(comment)
										] === 'LIKE'
											? 'carbon:thumbs-up-filled'
											: 'carbon:thumbs-up'
									"
									@createlikeComment="
										LikeComment(
											comment._id,
											renderComments.commentsMovie.indexOf(comment),
										)
									"
									:data_dislike="
										this.$store.state.Likes.likeList[
											renderComments.commentsMovie.indexOf(comment)
										] === 'UNLIKE'
											? 'carbon:thumbs-down-filled'
											: 'carbon:thumbs-down'
									"
									@createdislikeComment="
										UnlikeComment(
											comment._id,
											renderComments.commentsMovie.indexOf(comment),
										)
									"
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
										>Salvar
									</b-button>
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
					<b-col
						cols="12"
						v-if="
							responseComment &&
							id === comment._id &&
							this.renderListComments === true
						"
					>
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
									<div class="avatar-reply">
										<Avatar
											:src="
												'/img/' +
												(reply.userAvatar !== undefined
													? reply.userAvatar
													: 'user-default.png')
											"
										/>
									</div>
								</b-col>
								<b-col cols="9" class="p-0 info-reply">
									<h5>
										{{ reply.name }}
									</h5>
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
											:data_timestamp="new Date(comment.date).toLocaleString()"
											v-if="btnViewsComments && teste != reply._id"
											:data_statuslike="reply.like"
											:data_statusdislike="reply.deslike"
											:data_like="
												this.$store.state.Likes.likeListResponses[
													this.$store.state.Comments.GetCommentResponse.response.indexOf(
														reply,
													)
												] === 'LIKE'
													? 'carbon:thumbs-up-filled'
													: 'carbon:thumbs-up'
											"
											@createlikeComment="
												LikeCommentResponse(
													reply._id,
													this.$store.state.Comments.GetCommentResponse.response.indexOf(
														reply,
													),
												)
											"
											:data_dislike="
												this.$store.state.Likes.likeListResponses[
													this.$store.state.Comments.GetCommentResponse.response.indexOf(
														reply,
													)
												] === 'UNLIKE'
													? 'carbon:thumbs-down-filled'
													: 'carbon:thumbs-down'
											"
											@createdislikeComment="
												UnlikeCommentResponse(
													reply._id,
													this.$store.state.Comments.GetCommentResponse.response.indexOf(
														reply,
													),
												)
											"
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
								</b-col>
								<div class="modal-actions">
									<ModalOptionsComment
										v-if="reply.email === this.$store.state.Users.UserEmail"
										@edit="editComments(reply._id)"
										@delete="$emit('deleteComment', reply._id)"
									/>
								</div>
							</b-row>
						</div>
						<div
							v-if="this.$store.state.Comments.GetCommentResponse.response > []"
							class="d-flex justify-content-end ViewMoreResponse"
						>
							<p class="viewmore" @click="viewMoreResponse">Mostrar Mais</p>
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
		</div>
		<!-- pagination -->
		<div
			v-if="renderComments.commentsMovie > []"
			class="d-flex justify-content-end"
		>
			<p class="viewmore" @click="viewMore">Mostrar Mais</p>
		</div>
		<!-- Comentar -->
		<div>
			<b-row class="boxYourComment">
				<b-col class="d-flex justify-content-end align-items-start" cols="2">
					<div class="avatar-comment">
						<img
							:src="
								$store.state.Users.UserName &&
								$store.state.Users.UserAvatar !== ''
									? this.avatar
									: this.Noavatar
							"
							size="5rem"
						/>
					</div>
				</b-col>
				<b-col>
					<h5>Seu Comentário</h5>
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
		<OptionsModal
			v-if="hiddenOptionModal"
			:hiddenBtnLogin="true"
			@closeWindow="closeOptionModal"
			:action="message"
		/>
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
import { mapGetters } from 'vuex';
import OptionsModal from '../Modals/OptionsModal.vue';
//import BoxComment from './BoxComment.vue';

export default defineComponent({
	components: {
		Avatar,
		TextAreaField,
		DisplayInteractionInfos,
		ModalOptionsComment,
		ButtonDefault,
		OptionsModal,
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
			renderList: false,
			renderListComments: false,
			responseComment: false,
			responseView: false,
			editComment: true,
			likeComment: false,
			DeslikeComment: false,
			btnViewsComments: true,
			hiddenOptionModal: false,
			message: '',
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
		closeOptionModal() {
			this.hiddenOptionModal = false;
		},
		// tratamento para botao like
		LikeComment(commentId: string, index: number) {
			if (!localStorage.getItem('token')) {
				this.message = 'Para deixar um like ao comentário é necessário estar logado!';
				this.hiddenOptionModal = true;
			} else {
				this.DeslikeComment = false;
				this.idCommentLike = commentId;
				if (
					this.$store.state.Likes.likeList[index] === 'LIKE' &&
					this.DeslikeComment === false
				) {
					this.likeComment = false;
				} else if (
					this.$store.state.Likes.likeList[index] === 'NOT' &&
					this.DeslikeComment === false
				) {
					this.likeComment = true;
				} else if (this.$store.state.Likes.likeList[index] === 'UNLIKE') {
					this.DeslikeComment = true;
					this.likeComment = false;
				}

				if (this.likeComment === true && this.DeslikeComment === false) {
					this.PostLike(commentId, index);
				} else if (
					this.likeComment === false &&
					this.DeslikeComment === false
				) {
					this.RemoveLike(commentId, index);
				} else {
					this.PostLike(commentId, index);
				}
			}
		},
		// adicionar like
		PostLike(commentId: string, index: number) {
			this.likeComment = true;
			this.DeslikeComment = false;
			(this.userlike.commentId = commentId),
				(this.userlike.userLike[0].userId = this.$store.state.Users.UserId);
			(this.userlike.userLike[0].like = true),
				(this.userlike.userLike[0].unlike = false),
				this.$store.dispatch('createLikeComment', {
					like: this.userlike,
					index: index,
					deslike: false,
					Islike: true,
				});
		},
		// remover like
		RemoveLike(commentId: string, index: number) {
			this.likeComment = false;
			this.DeslikeComment = false;
			(this.userlike.commentId = commentId),
				(this.userlike.userLike[0].userId = this.$store.state.Users.UserId);
			(this.userlike.userLike[0].like = false),
				(this.userlike.userLike[0].unlike = false),
				this.$store.dispatch('createLikeComment', {
					like: this.userlike,
					index: index,
					deslike: false,
					Islike: false,
				});
		},
		// tratamento para botao deslike
		UnlikeComment(commentId: string, index: number) {
			if (!localStorage.getItem('token')) {
				this.message = 'Para deixar um dislike ao comentário é necessário estar logado!';
				this.hiddenOptionModal = true;
			} else {
				this.likeComment = false;
				if (
					this.$store.state.Likes.likeList[index] === 'UNLIKE' &&
					this.likeComment === false
				) {
					this.DeslikeComment = false;
				} else if (
					this.$store.state.Likes.likeList[index] === 'NOT' &&
					this.likeComment === false
				) {
					this.DeslikeComment = true;
				} else if (this.$store.state.Likes.likeList[index] === 'LIKE') {
					this.DeslikeComment = false;
					this.likeComment = true;
				}
				this.idCommentLike = commentId;
				if (this.DeslikeComment === true && this.likeComment === false) {
					this.PostDeslike(commentId, index);
				} else if (
					this.DeslikeComment === false &&
					this.likeComment === false
				) {
					this.RemoveDeslike(commentId, index);
				} else {
					this.PostDeslike(commentId, index);
				}
			}
		},
		PostDeslike(commentId: string, index: number) {
			this.DeslikeComment = true;
			this.likeComment = false;
			(this.userlike.commentId = commentId),
				(this.userlike.userLike[0].userId = this.$store.state.Users.UserId);
			(this.userlike.userLike[0].like = false),
				(this.userlike.userLike[0].unlike = true),
				this.$store.dispatch('createLikeComment', {
					like: this.userlike,
					index: index,
					deslike: true,
					Islike: false,
				});
		},
		RemoveDeslike(commentId: string, index: number) {
			this.DeslikeComment = false;
			this.likeComment = false;
			(this.userlike.commentId = commentId),
				(this.userlike.userLike[0].userId = this.$store.state.Users.UserId);
			(this.userlike.userLike[0].like = false),
				(this.userlike.userLike[0].unlike = false),
				this.$store.dispatch('createLikeComment', {
					like: this.userlike,
					index: index,
					deslike: false,
					Islike: false,
				});
		},
		LikeCommentResponse(commentId: string, index: number) {
			if (!localStorage.getItem('token')) {
				this.message = 'Para deixar um like ao comentário é necessário estar logado!';
				this.hiddenOptionModal = true;
			} else {
				this.DeslikeComment = false;
				this.idCommentLike = commentId;
				if (
					this.$store.state.Likes.likeListResponses[index] === 'LIKE' &&
					this.DeslikeComment === false
				) {
					this.likeComment = false;
				} else if (
					this.$store.state.Likes.likeListResponses[index] === 'NOT' &&
					this.DeslikeComment === false
				) {
					this.likeComment = true;
				} else if (
					this.$store.state.Likes.likeListResponses[index] === 'UNLIKE'
				) {
					this.DeslikeComment = true;
					this.likeComment = false;
				}

				if (this.likeComment === true && this.DeslikeComment === false) {
					this.PostLikeResponse(commentId, index);
				} else if (this.likeComment === false && this.DeslikeComment === false) {
					this.RemoveLikeResponse(commentId, index);
				} else {
					this.PostLikeResponse(commentId, index);
				}
			}
		},
		// adicionar like
		PostLikeResponse(commentId: string, index: number) {
			if (localStorage.getItem('token') === '') {
				alert('teste');
			} else {
				this.likeComment = true;
				this.DeslikeComment = false;
				(this.userlike.commentId = commentId),
					(this.userlike.userLike[0].userId = this.$store.state.Users.UserId);
				(this.userlike.userLike[0].like = true),
					(this.userlike.userLike[0].unlike = false),
					this.$store.dispatch('createLikeCommentResponse', {
						like: this.userlike,
						index: index,
						deslike: false,
						Islike: true,
					});
			}
		},
		// remover like
		RemoveLikeResponse(commentId: string, index: number) {
			this.likeComment = false;
			this.DeslikeComment = false;
			(this.userlike.commentId = commentId),
				(this.userlike.userLike[0].userId = this.$store.state.Users.UserId);
			(this.userlike.userLike[0].like = false),
				(this.userlike.userLike[0].unlike = false),
				this.$store.dispatch('createLikeCommentResponse', {
					like: this.userlike,
					index: index,
					deslike: false,
					Islike: false,
				});
		},
		// tratamento para botao deslike
		UnlikeCommentResponse(commentId: string, index: number) {
			if (!localStorage.getItem('token')) {
				this.message = 'Para deixar um dislike ao comentário é necessário estar logado!';
				this.hiddenOptionModal = true;
			} else {
				this.likeComment = false;
				if (
					this.$store.state.Likes.likeListResponses[index] === 'UNLIKE' &&
					this.likeComment === false
				) {
					this.DeslikeComment = false;
				} else if (
					this.$store.state.Likes.likeListResponses[index] === 'NOT' &&
					this.likeComment === false
				) {
					this.DeslikeComment = true;
				} else if (this.$store.state.Likes.likeListResponses[index] === 'LIKE') {
					this.DeslikeComment = false;
					this.likeComment = true;
				}
				this.idCommentLike = commentId;
				if (this.DeslikeComment === true && this.likeComment === false) {
					this.PostDeslikeResponse(commentId, index);
				} else if (this.DeslikeComment === false && this.likeComment === false) {
					this.RemoveDeslikeResponse(commentId, index);
				} else {
					this.PostDeslikeResponse(commentId, index);
				}
			}

		},
		PostDeslikeResponse(commentId: string, index: number) {
			this.DeslikeComment = true;
			this.likeComment = false;
			(this.userlike.commentId = commentId),
				(this.userlike.userLike[0].userId = this.$store.state.Users.UserId);
			(this.userlike.userLike[0].like = false),
				(this.userlike.userLike[0].unlike = true),
				this.$store.dispatch('createLikeCommentResponse', {
					like: this.userlike,
					index: index,
					deslike: true,
					Islike: false,
				});
		},
		RemoveDeslikeResponse(commentId: string, index: number) {
			this.DeslikeComment = false;
			this.likeComment = false;
			(this.userlike.commentId = commentId),
				(this.userlike.userLike[0].userId = this.$store.state.Users.UserId);
			(this.userlike.userLike[0].like = false),
				(this.userlike.userLike[0].unlike = false),
				this.$store.dispatch('createLikeCommentResponse', {
					like: this.userlike,
					index: index,
					deslike: false,
					Islike: false,
				});
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

	async mounted() {
		this.socketService.registerListener(
			'new-liked',
			'new-liked',
			(commentId) => {
				this.PostLike(commentId, 0);
			},
		);

		this.socketService.registerListener(
			'all-likes',
			'all-likes',
			(commentId) => {
				this.LikeComment(commentId, 0);
			},
		);

		//fechar botoes de edição
		this.socketService.registerListener(
			'update-comment',
			'update-comment',
			() => {
				this.cancelEdit();
			},
		);

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
	async beforeMount() {
		this.$store.state.Likes.likeList = [];
		for (
			let index = 0;
			index < (await this.renderComments.commentsMovie.length);
			index++
		) {
			await this.$store.dispatch('getAllLikesComment', {
				id: await this.renderComments.commentsMovie[index]._id,
				userId: {
					userId: await this.$store.state.Users.UserId,
				},
			});
			if (index + 1 === (await this.renderComments.commentsMovie.length)) {
				this.renderList = true;
			}
		}
	},
	computed: {
		...mapGetters(['Comments/getComments']),
		...mapGetters(['Comments/getCommentsResponse']),
	},
	watch: {
		async ['Comments/getComments']() {
			this.renderList = false;
			this.$store.state.Likes.likeList = [];
			for (
				let index = 0;
				index < (await this.renderComments.commentsMovie.length);
				index++
			) {
				await this.$store.dispatch('getAllLikesComment', {
					id: await this.renderComments.commentsMovie[index]._id,
					userId: {
						userId: await this.$store.state.Users.UserId,
					},
				});
				if (index + 1 === (await this.renderComments.commentsMovie.length)) {
					this.renderList = true;
				}
			}
		},
		async ['Comments/getCommentsResponse']() {
			this.renderListComments = false;
			this.$store.state.Likes.likeListResponses = [];
			for (
				let index = 0;
				index <
				(await this.$store.state.Comments.GetCommentResponse.response.length);
				index++
			) {
				await this.$store.dispatch('getAllLikesCommentResponse', {
					id: await this.$store.state.Comments.GetCommentResponse.response[
						index
					]._id,
					userId: {
						userId: await this.$store.state.Users.UserId,
					},
				});
				if (
					index + 1 ===
					(await this.$store.state.Comments.GetCommentResponse.response.length)
				) {
					this.renderListComments = true;
				}
			}
		},
	},
});
</script>
