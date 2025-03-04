<template>
	<div class="completed-process">
		<ProcessHeader />
		<Statuses
			:statuses="activeProcess.process.statuses"
			completed
			class="completed-process__statuses"
			v-if="showStatuses"
		/>
		<Stages
			:stages="activeProcess.process.stages"
			mode="view"
		/>
		<div
			v-if="access.full"
			class="completed-process__buttons"
		>
			<AllowCreateProcessButton />
		</div>
	</div>
</template>
<script setup>
import { inject } from 'vue';
import { useActiveProcess } from '@/plugins/process/common';
import { Stages } from '@/plugins/process/process/features/stages';
import { Statuses } from '@/plugins/process/process/features/statuses';
import { ProcessHeader } from '@/plugins/process/process/features/process-header';
import { AllowCreateProcessButton } from '@/plugins/process/process/features/process';
import { useProcessSettings } from '@/plugins/process/process/components';

const { activeProcess } = useActiveProcess();
const { showStatuses } = useProcessSettings();
const access = inject('access');
</script>
<style scoped lang="scss">
.completed-process {
	display: flex;
	flex-direction: column;
	gap: 1.25rem;

	&__buttons {
		display: flex;
		flex-wrap: wrap;
		gap: .5rem;
		justify-content: flex-end;

		&>.el-button {
			margin-left: 0;
		}
	}
}
</style>