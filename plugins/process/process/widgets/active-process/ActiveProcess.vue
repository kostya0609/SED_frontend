<template>
	<div class="active-process">
		<CompletedProcesses />
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
		<template v-else-if="activeProcess.isCompleted()">
			<div
				class="active-process__completed"
				v-if="showCompletedProcesses"
			>
				<AllowCreateProcessButton v-if="access.full" />
			</div>
			<CompletedProcess v-else>
				<template v-slot:head="{ process }">
					<slot
						name="head"
						:process="process.process"
					/>
				</template>
			</CompletedProcess>
		</template>
		<NotCreatedProcess v-else-if="activeProcess.isNotCreated()" />
	</div>
</template>
<script setup>
import { onMounted, provide, inject } from 'vue';
import { CreatedProcess } from './created-process';
import { NotCreatedProcess } from './not-created-process';
import { CompletedProcess } from './completed-process';
import { useActiveProcess, useProcessProvider } from '@/plugins/process/common';
import { ProcessInfo } from '@/plugins/process/process/features/process-info';
import { CompletedProcesses } from '@/plugins/process/process/features/completed-processes';
import { AllowCreateProcessButton } from '@/plugins/process/process/features/process';

const access = inject('access');

const { isDebug } = useProcessProvider();
const { activeProcess, getCountParticipants } = useActiveProcess();
const { showCompletedProcesses } = useProcessProvider();

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
<style lang="scss" scoped>
.process-info {
	margin: 1rem 0;
}

.user-table {
	margin-top: 1rem;
}

.active-process {
	display: flex;
	flex-direction: column;
	gap: 1.5rem;

	&__completed {
		text-align: center;
	}
}
</style>