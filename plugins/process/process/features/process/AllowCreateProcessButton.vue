<template>
	<DoubleConfirmPopover
		title="Вы уверены, что хотите разрешить создание процесса?"
		@confirm="deactivate"
		v-slot:reference
	>
		<el-button
			type="primary"
			:loading="loading"
		>
			<slot>Разрешить создание процесса</slot>
		</el-button>
	</DoubleConfirmPopover>
</template>
<script setup>
import { ref } from 'vue';
import { notify, useProcessProvider, DoubleConfirmPopover, useActiveProcess } from '@/plugins/process/common';

const { deactivateCompletedProcess } = useActiveProcess();
const { templateId, documentId, userId } = useProcessProvider();

const loading = ref(false);

const deactivate = async () => {
	try {
		loading.value = true;

		await deactivateCompletedProcess(
			documentId.value,
			templateId.value,
			userId.value,
		);
	} catch (e) {
		notify.fetchError(e.message);
		throw e;
	} finally {
		loading.value = false;
	}
};
</script>