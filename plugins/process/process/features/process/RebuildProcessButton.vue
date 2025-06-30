<template>
	<DoubleConfirmPopover
		title="Вы уверены, что хотите пересоздать процесс?"
		@confirm="rebuild"
		v-slot:reference
	>
		<el-button
			type="danger"
			:loading="loading"
		>
			Пересоздать процесс
		</el-button>
	</DoubleConfirmPopover>
</template>
<script setup>
import { ref } from 'vue';
import { useActiveProcess, DoubleConfirmPopover, notify, useProcessProvider } from '@/plugins/process/common';

const { rebuildProcess } = useActiveProcess();
const { templateId, documentId, userId, executorId } = useProcessProvider();

const loading = ref(false);

const rebuild = async () => {
	try {
		loading.value = true;
		await rebuildProcess({
			user_id: userId.value,
			document_id: documentId.value,
			template_id: templateId.value,
			document_user_id: executorId.value,
		});
	} catch (e) {
		notify.fetchError(e.message);
		throw e;
	} finally {
		loading.value = false;
	}
};
</script>