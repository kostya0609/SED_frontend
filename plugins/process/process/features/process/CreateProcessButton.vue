<template>
	<DoubleConfirmPopover
		title="Вы уверены, что хотите принудительно создать процесс?"
		@confirm="create"
		v-slot:reference
	>
		<el-button
			type="primary"
			:loading=loading
		>
			<slot>Принудительно создать процесс</slot>
		</el-button>
	</DoubleConfirmPopover>
</template>
<script setup>
import { inject, ref } from 'vue';
import { notify, useProcessProvider, DoubleConfirmPopover, useActiveProcess } from '@/plugins/process/common';

const { createProcess } = useActiveProcess();
const { templateId, documentId, executorId, userId } = useProcessProvider();

const emit = inject('emit');

const loading = ref(false);

const create = async () => {
	try {
		loading.value = true;

		await createProcess({
			user_id: userId.value,
			document_id: documentId.value,
			template_id: templateId.value,
			document_user_id: executorId.value,
		});
		emit('created');
	} catch (e) {
		notify.fetchError(e.message);
		throw e;
	} finally {
		loading.value = false;
	}
};
</script>