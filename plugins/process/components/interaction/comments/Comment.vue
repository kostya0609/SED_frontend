<template>
  <div class="comment">
    <el-card class="comment__card"
             :class="isUnansweredComment() && process && process.status.id === PROCESS_STATUS.PREPARATION ? 'disabled' : ''">
      <template #header>
        <UserLink
            :user="comment.user"
            style="display: inline-grid;"
        />
        <template v-if="comment.position_title">({{ comment.position_title }})</template>
        с ролью "{{ comment.role.title }}"
        {{ formatDateTime(comment.created_at) }}
      </template>
      <template #default>
        <div class="comment__body">
          <div class="comment__title">{{ comment.title }}:</div>
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
              v-if="actions.length && !comment.answers.length"
              :actions="actions"
              @executeAction="executeAction"
          />
          <el-alert
              v-else-if="isUnansweredComment() && process && process.status.id === PROCESS_STATUS.PREPARATION"
              :closable="false"
              type="info"
              class="comment-footer__alert">
            Ответить на сообщение можно только при запущенном бизнес-процессе!
          </el-alert>
        </div>
      </template>
    </el-card>
    <div
        class="comment__answers"
        v-if="comment.answers.length"
    >
      <ArrowIcon class="comment__arrow"/>
      <slot/>
    </div>
  </div>
  <CommentModal
      v-model="showCommentModal"
      @change="sendAnswer"
  />
</template>
<script setup>
import {computed, inject, ref} from 'vue';
import {formatDateTime, getDownloadLink, notify} from '@/plugins/process/utils';
import {PARTICIPANT_TYPE, PROCESS_STATUS} from '@/plugins/process/constants';
import UserLink from '@/plugins/process/components/common/UserLink.vue';
import ArrowIcon from '@/plugins/process/components/common/ArrowIcon.vue';
import Actions from '@/plugins/process/components/interaction/actions/Actions.vue';
import CommentModal from '@/plugins/process/components/interaction/CommentModal.vue';

const {InteractionCommentRepo} = inject('useRepo');
const document = inject('document');
const setComments = inject('setComments');
const userId = inject('userId');
const process = inject('process');
const executorId = inject('executorId');

const showCommentModal = ref(false);
let selectedActionId = null;

const props = defineProps({
  comment: Object,
});

const actions = computed(() => props.comment.actions.filter(action => {
  if (process.value && process.value.id !== props.comment.process_id || (process.value.status.id == PROCESS_STATUS.PREPARATION || process.value.status.id === PROCESS_STATUS.DONE)) {
    return false;
  }

  if (action.who_access_id === PARTICIPANT_TYPE.EXECUTOR) {
    return process.value ? process.value.user_id === userId.value : false;
  } else if (action.who_access_id === PARTICIPANT_TYPE.DOCUMENT_EXECUTOR) {
    return userId.value === executorId.value;
  } else {
    return false;
  }
}));

const decide = async (comment = '') => {
  try {
    const comments = await InteractionCommentRepo.decide({
      process_id: props.comment.process_id,
      action_id: selectedActionId,
      user_id: userId.value,
      comment_parent_id: props.comment.id,
      comment_content: comment,
      document: document.value,
    });
    setComments(comments);
  } catch (e) {
    notify.fetchError(e.message);
    throw e;
  }
};

const sendAnswer = async ({answer}) => {
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
</style>