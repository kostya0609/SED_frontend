<template>
	<CloseTechnicalWork>
		<div
			class="comments"
			v-if="comments.length"
		>
			<Comments
				v-for="comment in comments"
				:key="comment.id"
				:comment="comment"
			/>
		</div>
		<el-empty
			description="Взаимодействия еще не было!"
			v-else
		/>
	</CloseTechnicalWork>
</template>
<script setup>
import { Comments } from '@/plugins/process/interaction/widgets/comment';
import { useComments } from '@/plugins/process/interaction/entities/comment';
import { useActiveProcess, notify, useProcessProvider } from '@/plugins/process/common';
import { CloseTechnicalWork } from '@/plugins/process/common/features/settings/close-technical-work';
import { provide } from 'vue';

const emit = defineEmits([
	'confirmed-cancellation',
	'cancelled-cancellation',

	'confirmed-deadline',
	'cancelled-deadline',

	'confirmed-executor-change',
	'cancelled-executor-change',
]);

const { activeProcess } = useActiveProcess();
const { comments, initComments } = useComments();
const { documentId, templateId, userId } = useProcessProvider();

if (!activeProcess.value) {
	throw new Error('Активный процесс не был передан!');
}

try {
	await initComments(documentId.value, templateId.value, userId.value);
} catch (e) {
	notify.fetchError(e.message);
	throw e;
}

provide('emit', emit);
</script>
<style scoped lang="scss">
.comments {
	display: flex;
	flex-direction: column;
	gap: .5rem;
}
</style>