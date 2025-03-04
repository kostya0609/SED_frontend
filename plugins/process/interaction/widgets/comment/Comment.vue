<template>
	<div class="comment">
		<Preloader :loading="loading">
			<el-card
				class="comment__card"
				:class="isUnansweredComment() && activeProcess.isCreated() && [PROCESS_STATUS.PREPARATION, PROCESS_STATUS.DONE].includes(activeProcess.process.status.id) ? 'disabled' : ''"
			>
				<template #header>
					<div class="group-fio">
						<div class="group-fio__wrapper">
							<div
								v-if="comment.subuser"
								class="group-fio__subuser"
							>
								<UserLink :user="comment.subuser" />&nbsp;за
							</div>
							<div class="group-fio__user-wrapper">
								<UserLink
									:user="comment.user"
									class="group-fio__user"
									:class="{ 'group-fio__user--with-subuser': comment.subuser }"
								/>
								<div>
									<template v-if="comment.position_title">({{ comment.position_title }})</template>
									с ролью "{{ comment.role.title }}"
									{{ formatDateTime(comment.created_at) }}
								</div>
							</div>
						</div>
					</div>
				</template>
				<template #default>
					<div class="comment__body">
						<div class="comment__title">{{ comment.title + (comment.content ? ':' : '') }}</div>
						<div class="comment__content">{{ comment.content }}</div>
						<div
							class="comment__attached-files"
							v-if="comment.files.length"
						>
							<div class="comment__subhead">Прикрепленные файлы:</div>
							<ul class="comment__files">
								<li
									v-for="file of comment.files"
									:key="file.id"
								>
									<el-link :href="getDownloadLink(file.id)">
										{{ file.original_name }}
									</el-link>
								</li>
							</ul>
						</div>
					</div>
					<div class="comment__footer">
						<Actions
							v-if="activeProcess.isCreated() && (activeProcess.process.status.id !== PROCESS_STATUS.PREPARATION && activeProcess.process.status.id !== PROCESS_STATUS.DONE) && !comment.answers.length"
							:actions="comment.actions"
							:comment="comment"
							@executeAction="executeAction"
						/>
						<el-alert
							v-else-if="isUnansweredComment() && activeProcess.isCreated() && activeProcess.process.status.id === PROCESS_STATUS.PREPARATION"
							:closable="false"
							type="info"
							class="comment-footer__alert"
						>
							Ответить на сообщение можно только при запущенном бизнес-процессе!
						</el-alert>
					</div>
				</template>
			</el-card>
			<div
				class="comment__answers"
				v-if="comment.answers.length"
			>
				<ArrowIcon class="comment__arrow" />
				<slot />
			</div>
		</Preloader>
	</div>
	<CommentModal
		v-model="showCommentModal"
		@change="sendAnswer"
	/>
</template>
<script setup>
import { inject, ref } from 'vue';
import { useComments } from '@/plugins/process/interaction/entities/comment';
import { Actions } from '@/plugins/process/interaction/features/action-buttons';
import { CommentModal } from '@/plugins/process/interaction/features/comment-modal';
import { Preloader, ArrowIcon, UserLink, PROCESS_STATUS, formatDateTime, getDownloadLink, notify, useActiveProcess, useProcessProvider, TEMPLATE_ACTION } from '@/plugins/process/common';

const emit = inject('emit');

const { replyToComment } = useComments();
const { activeProcess } = useActiveProcess();
const { document, userId } = useProcessProvider();

const showCommentModal = ref(false);
const loading = ref(false);

let selectedActionId = null;

const actionEvents = {
	[TEMPLATE_ACTION.CONFIRM_CANCELLATION]: 'confirmed-cancellation',
	[TEMPLATE_ACTION.CANCEL_CANCELLATION]: 'cancelled-cancellation',

	[TEMPLATE_ACTION.CONFIRM_DEADLINE_CHANGE]: 'confirmed-deadline',
	[TEMPLATE_ACTION.CANCEL_DEADLINE_CHANGE]: 'cancelled-deadline',

	[TEMPLATE_ACTION.CONFIRM_EXECUTOR_CHANGE]: 'confirmed-executor-change',
	[TEMPLATE_ACTION.CANCEL_EXECUTOR_CHANGE]: 'cancelled-executor-change',
};

const props = defineProps({
	comment: Object,
});

const executeEvents = (actionId) => {
	const eventName = actionEvents[actionId];

	if (eventName) {
		emit(eventName);
	}
};

const decide = async (comment = '') => {
	try {
		loading.value = true;
		await replyToComment({
			process_id: props.comment.process_id,
			action_id: selectedActionId,
			user_id: userId.value,
			comment_parent_id: props.comment.id,
			comment_content: comment,
			document: document.value,
		});
		executeEvents(selectedActionId);
	} catch (e) {
		notify.fetchError(e.message);
		throw e;
	} finally {
		loading.value = false;
	}
};

const sendAnswer = async ({ answer }) => {
	showCommentModal.value = false;
	await decide(answer);
};

const executeAction = async (action) => {
	selectedActionId = action.id;

	if (action.is_commentable) {
		showCommentModal.value = true;
	} else {
		await decide();
	}
};

const isUnansweredComment = () =>
	!props.comment.parent_id &&
	!props.comment.answers.length &&
	props.comment.actions.length;
</script>
<style scoped lang="scss">
.comment {

	&__subhead {
		font-style: italic;
	}

	::v-deep(.el-card) {
		--el-card-border-radius: 6px;

		&.disabled {
			background-color: #F5F5F5;
		}
	}

	::v-deep(.el-card__header) {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: .5rem;
		padding: .75rem !important;
		border-bottom: none;
	}

	::v-deep(.el-card__body) {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding-top: 0;
	}

	&__footer {
		display: flex;
		justify-content: flex-end;
	}

	&__answers {
		padding-left: 2rem;
		padding-top: 1rem;
		display: flex;
		gap: .5rem;
	}

	&__arrow {
		position: relative;
		transform: translateY(-10px);
	}

	&__title {
		font-weight: bold;
	}

	&__content {
		margin-left: 1rem;
	}

	&__attached-files {
		margin-top: 1rem;
	}

	&__files {
		list-style: numeric;
		margin-left: 1.5rem;

		& .el-link {
			vertical-align: initial;
		}
	}
}

.comment-footer {
	&__alert {
		width: auto;
		background-color: transparent;
	}
}

.group-fio {
	display: flex;
	align-items: center;
	gap: .5rem;

	&__wrapper {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: .25rem;
	}

	&__user {
		&--with-subuser {
			margin-left: 2rem;
		}
	}

	&__user-wrapper {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: .5rem;
	}

	&__subuser {
		display: flex;
		align-items: center;
		font-style: italic;
	}
}
</style>