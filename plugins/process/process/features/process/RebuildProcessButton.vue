<template>
	<el-popconfirm
		title="Вы уверены, что хотите пересоздать процесс?"
		@confirm="rebuild"
		width="300"
		v-slot:reference
	>
		<el-button
			type="danger"
			:loading="loading"
		>
			Пересоздать процесс
		</el-button>
	</el-popconfirm>
</template>
<script setup>
import { ref } from 'vue';
import { notify, useProcessProvider } from '@/plugins/process/common';
import { useActiveProcess } from '@/plugins/process/common';

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