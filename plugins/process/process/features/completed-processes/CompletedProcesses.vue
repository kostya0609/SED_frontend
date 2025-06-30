<template>
	<Preloader :loading="loading">
		<el-collapse
			v-if="completedProcesses.length && showCompletedProcesses"
			v-model="activeNames"
			class="completed-processes"
		>
			<el-collapse-item
				v-for="process in completedProcesses"
				:name="process.id"
			>
				<template #title>
					<el-text
						type="info"
						class="completed-processes__title"
					>{{ getProcessTitle(process) }}</el-text>
				</template>
				<Stages
					:stages="process.stages"
					mode="view"
					class="completed-processes__stages"
				/>
			</el-collapse-item>
		</el-collapse>
	</Preloader>
</template>
<script setup>
import { inject, ref } from 'vue';
import { Preloader } from '@/plugins/process/common/shared/ui';
import { Stages } from '@/plugins/process/process/features/stages';
import { formatDate, useProcessProvider } from '@/plugins/process/common';

const { ProcessRepo } = inject('useRepo');
const { documentId, moduleName, showCompletedProcesses } = useProcessProvider();

const completedProcesses = ref([]);
const activeNames = ref([]);
const loading = ref(false);

const getProcessTitle = (process) => {
	const finishedAt = formatDate(process.finished_at, {
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric',
	});

	return `${process.title} - завершен ${finishedAt}`;
};

if (showCompletedProcesses) {
	try {
		loading.value = true;

		completedProcesses.value = await ProcessRepo.getCompletedProcesses({
			document_id: documentId.value,
			module_name: moduleName.value,
		});

		activeNames.value = completedProcesses.value.map((process) => process.id);
	} catch (error) {
		throw error;
	} finally {
		loading.value = false;
	}
}
</script>
<style lang="scss">
// Аттрибут scoped не использовать.

.completed-processes {
	--completed-processes-bg-color: #FAFAFA;
	--el-collapse-header-bg-color: var(--completed-processes-bg-color);
	--el-collapse-content-bg-color: var(--completed-processes-bg-color);

	.el-card {
		--el-card-bg-color: var(--completed-processes-bg-color);

		.el-table tr {
			--el-table-tr-bg-color: var(--completed-processes-bg-color);
		}

		.el-table th.el-table__cell {
			--el-table-header-bg-color: var(--completed-processes-bg-color);
		}
	}

	&__stages {
		padding-right: 1.5rem;
	}

	&__title {
		margin-left: 1rem;
	}
}
</style>