<template>
	<DoubleConfirmPopover
		title="Вы уверены, что хотите удалить процесс?"
		@confirm="remove"
		v-slot:reference
	>
		<el-button
			type="danger"
			:loading="loading"
		>
			<slot>Удалить процесс</slot>
		</el-button>
	</DoubleConfirmPopover>
</template>
<script setup>
import { inject, ref } from 'vue';
import { notify, useProcessProvider } from '@/plugins/process/common';
import { useActiveProcess, DoubleConfirmPopover } from '@/plugins/process/common';

const { deleteProcess, activeProcess } = useActiveProcess();
const { userId } = useProcessProvider();

const emit = inject('emit');

const loading = ref(false);

const remove = async () => {
	try {
		loading.value = true;
		await deleteProcess(activeProcess.value.process.id, userId.value);
		emit('deleted');
	} catch (e) {
		notify.fetchError(e.message);
		throw e;
	} finally {
		loading.value = false;
	}
};
</script>