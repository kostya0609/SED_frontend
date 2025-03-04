<template>
	<ProcessInfo
		class="process-info"
		v-if="isDebug"
	/>
	<CreatedProcess v-if="activeProcess.isCreated()">
		<template v-slot:head="process">
			<slot
				name="head"
				:process="process.process"
			/>
		</template>
	</CreatedProcess>
	<CompletedProcess v-else-if="activeProcess.isCompleted()">
		<template v-slot:head="{ process }">
			<slot
				name="head"
				:process="process.process"
			/>
		</template>
	</CompletedProcess>
	<NotCreatedProcess v-else-if="activeProcess.isNotCreated()" />
	<el-alert
		type="warning"
		v-else
	>
		Неверный тип процесса!
	</el-alert>
</template>
<script setup>
import { onMounted, provide } from 'vue';
import { CreatedProcess } from './created-process';
import { CompletedProcess } from './completed-process';
import { NotCreatedProcess } from './not-created-process';
import { useActiveProcess, useProcessProvider } from '@/plugins/process/common';
import { ProcessInfo } from '@/plugins/process/process/features/process-info';

const { isDebug } = useProcessProvider();
const { activeProcess, getCountParticipants } = useActiveProcess();

if (!activeProcess.value) {
	throw new Error('Активный процесс не был установлен!');
}

const emit = defineEmits([
	'runned',
	'executorCancelled',
	'participantCancelled',
	'cancelled',
	'decided',
	'decidedWithInteraction',
	'completed',
	'created',
	'deleted',
	'participantCountChanged',
]);

onMounted(() => {
	emit('participantCountChanged', getCountParticipants());
});



provide('emit', emit);
</script>
<style lang="scss">
.process-info {
	margin: 1rem 0;
}

.user-table {
	margin-top: 1rem;
}
</style>