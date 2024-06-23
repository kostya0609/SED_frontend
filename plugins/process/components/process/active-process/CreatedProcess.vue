<template>
	<h4 class="process__head">
		<slot
			name="head"
			:process="process"
		>
			{{ process.title }}
		</slot>
	</h4>
	<Statuses
		:statuses="process.statuses"
		:active-status-id="process.status.id"
		class="process__statuses"
	/>
	<PreparingProcess v-if="process.status.id === PROCESS_STATUS.PREPARATION" />
	<RunningProcess
		v-else
		:process="process"
	/>
</template>
<script setup>
import { watch, provide, ref } from 'vue';
import { PROCESS_STATUS } from '@/plugins/process/constants';
import Statuses from '@/plugins/process/components/process/Statuses.vue';
import RunningProcess from '@/plugins/process/components/process/created-process-state/RunningProcess.vue';
import PreparingProcess from '@/plugins/process/components/process/created-process-state/PreparingProcess.vue';

const props = defineProps({
	process: Object,
});

const processId = ref(props.process.id);
const process = ref(props.process);

const setProcess = prc => {
	process.value = prc;
	processId.value = prc.id;
};

watch(() => props.process, (prc) => {
	setProcess(prc);
});

provide('processId', processId);
provide('setProcess', setProcess);
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