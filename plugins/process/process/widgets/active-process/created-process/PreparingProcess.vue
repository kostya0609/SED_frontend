<template>
	<div class="preparing-process">
		<ProcessHeader />
		<template v-if="access.full || access.execute">
			<Statuses
				class="preparing-process__statuses"
				v-if="showStatuses"
			/>
			<Preloader :loading="loading">
				<Stages
					:stages="activeProcess.process.stages"
					mode="edit"
				/>
			</Preloader>
			<div
				class="preparing-process__actions"
				v-if="showButtonsOnPreparation"
			>
				<DeleteProcessButton v-if="access.full" />
				<RebuildProcessButton v-if="access.full" />
				<RunProcessButton v-if="access.full || access.execute" />
			</div>
		</template>
		<template v-else>
			<el-result
				icon="warning"
				title="Процесс на подготовке!"
				sub-title="Пожалуйста, дождитесь когда процесс будет запущен!"
			/>
		</template>
	</div>
</template>
<script setup>
import { inject } from 'vue';
import { Stages } from '@/plugins/process/process/features/stages';
import { Statuses } from '@/plugins/process/process/features/statuses';
import Preloader from '@/plugins/process/common/shared/ui/Preloader.vue';
import { ProcessHeader } from '@/plugins/process/process/features/process-header';
import { useApprovalRoute } from '@/plugins/process/process/features/select-approval-route';
import { DeleteProcessButton, RebuildProcessButton, RunProcessButton } from '@/plugins/process/process/features/process';
import { useProcessSettings } from '@/plugins/process/process/components';
import { useActiveProcess } from '@/plugins/process/common';

const { loading } = useApprovalRoute();
const { showStatuses, showButtonsOnPreparation } = useProcessSettings();
const { activeProcess } = useActiveProcess();

const access = inject('access');
</script>
<style scoped lang="scss">
.preparing-process {
	display: flex;
	flex-direction: column;
	gap: .5rem;

	&__actions {
		display: flex;
		justify-content: flex-end;
		flex-wrap: wrap;
		gap: .5rem;

		&::v-deep(.el-button + .el-button) {
			margin-left: 0;
		}
	}
}
</style>