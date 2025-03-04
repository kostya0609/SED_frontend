<template>
	<PreparingProcess v-if="activeProcess.process.status.id === PROCESS_STATUS.PREPARATION" />
	<RunningProcess v-else />
</template>
<script setup>
import RunningProcess from './RunningProcess.vue';
import PreparingProcess from './PreparingProcess.vue';
import { PROCESS_STATUS, useActiveProcess } from '@/plugins/process/common';

const { activeProcess } = useActiveProcess();
</script>
<style scoped lang="scss">
.process {
	&__head {
		font-size: 1rem;
		font-weight: bold;
		margin-bottom: 1rem;
	}

	&__statuses {
		margin-bottom: 1rem;
	}
}
</style>