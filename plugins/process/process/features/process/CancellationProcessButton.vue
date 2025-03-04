<template>
	<el-button
		type="danger"
		:loading="loading"
		@click="showModal"
	>
		<slot>Аннулировать процесс</slot>
	</el-button>
	<CancellationConfirmModal
		v-model:visible="dialogVisible"
		@submit="cancellation"
	/>
</template>
<script setup>
import { inject, ref } from 'vue';
import { useActiveProcess } from '@/plugins/process/common';
import { notify, useProcessProvider } from '@/plugins/process/common';
import CancellationConfirmModal from './CancellationConfirmModal.vue';

const { cancellationProcess, activeProcess } = useActiveProcess();
const { userId } = useProcessProvider();

const emit = inject('emit');

const loading = ref(false);
const dialogVisible = ref(false);

const cancellation = async ({ comment }) => {
	try {
		loading.value = true;
		await cancellationProcess(
			activeProcess.value.process.id,
			userId.value,
			comment,
		);

		emit('executorCancelled');
		emit('cancelled');
	} catch (e) {
		notify.fetchError(e.message);
		throw e;
	} finally {
		loading.value = false;
	}
};

const showModal = () => {
	dialogVisible.value = true;
};
</script>