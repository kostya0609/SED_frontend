<template>
  <el-result
      icon="warning"
      :title="`Ведутся технические работы в модуле взаимодействия до ${closeTechnicalWork.interaction.finishedAt} по Хабаровскому времени`"
      v-if="closeTechnicalWork.interaction.enable"
  />
  <template v-else>
    <div
        class="comments"
        v-if="comments.length"
    >
      <Comment
          v-for="comment in comments"
          :key="comment.id"
          :comment="comment"
      />
    </div>
    <el-empty
        description="Взаимодействия еще не было!"
        v-else
    />
  </template>
</template>
<script setup>
import {inject, provide, ref} from 'vue';
import {ACTIVE_PROCESS_TYPE, PROCESS_STATUS} from '@/plugins/process/constants';
import Comment from '@/plugins/process/components/interaction/comments/Comments.vue';

const {InteractionCommentRepo} = inject('useRepo');
const activeProcess = inject('activeProcess', ref(null));
const closeTechnicalWork = inject('closeTechnicalWork');

if (!activeProcess.value) {
  throw new Error('Активный процесс не был передан!');
}

const comments = ref([]);
const process = ref(null);

const setComments = items => {
  comments.value = items;
}

const updateComments = async () => {
  process.value = [ACTIVE_PROCESS_TYPE.CREATED, ACTIVE_PROCESS_TYPE.COMPLETED].includes(activeProcess.value.type) ? activeProcess.value.process : null;

  if (!process.value) {
    setComments([]);
  } else {
    setComments(await InteractionCommentRepo.getByModuleName({
      module_name: process.value.module_name,
      document_id: process.value.document_id
    }));
  }
};

await updateComments();

defineExpose({
  updateComments,
});

provide('comments', comments);
provide('setComments', setComments);
provide('process', process);
</script>
<style scoped lang="scss">
.comments {
  display: flex;
  flex-direction: column;
  gap: .5rem;
}
</style>