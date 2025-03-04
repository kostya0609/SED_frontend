<template>
	<el-button
		type="primary"
		@click="run"
		:loading="loading"
	>
		<slot>Запустить процесс</slot>
	</el-button>
</template>
<script setup>
import { inject, ref } from 'vue';
import { useActiveProcess } from '@/plugins/process/common';
import { notify, useProcessProvider } from '@/plugins/process/common';

const { runProcess, activeProcess } = useActiveProcess();
const { userId } = useProcessProvider();

const emit = inject('emit');

const loading = ref(false);

const run = async () => {
	try {
		loading.value = true;
		await runProcess(activeProcess.value.process.id, userId.value);
		emit('runned');
	} catch (e) {
		notify.fetchError(e.message);
		throw e;
	} finally {
		loading.value = false;
	}
};
</script>