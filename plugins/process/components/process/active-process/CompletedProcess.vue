<template>
	<div class="completed-process">
		<div v-if="activeProcess.process.stages.length && activeProcess.process.statuses.length">
			<h4 class="completed-process__head">
				<slot
					name="head"
					:process="activeProcess"
				>
					{{ activeProcess.process.template.title }}
				</slot>
			</h4>
			<Statuses
				:statuses="activeProcess.process.statuses"
				completed
				class="completed-process__statuses"
			/>
			<Stages
				:stages="activeProcess.process.stages"
				mode="view"
			/>
			<div
				v-if="access.full"
				class="completed-process__buttons"
			>
				<el-button
					type="primary"
					@click="deactivateCompletedProcess"
					class="mb-5"
				>
					Разрешить создание процесса
				</el-button>
			</div>
		</div>
		<el-result
			icon="success"
			title="Этап завершен!"
			v-else
		>
			<template #extra>
				<el-button
					type="primary"
					@click="deactivateCompletedProcess"
					v-if="access.full"
					class="mb-5"
				>
					Разрешить создание процесса
				</el-button>
				<el-table
					:data="activeProcess.completed_history"
					border
				>
					<el-table-column
						prop="id"
						label="ID"
						align="center"
						sortable
						v-if="isDebug"
					/>
					<el-table-column
						prop="process_id"
						label="ID процесса"
						width="130"
						align="center"
						sortable
						v-if="isDebug"
					/>
					<el-table-column
						prop="template.id"
						label="ID шаблона"
						width="120"
						align="center"
						v-if="isDebug"
					/>
					<el-table-column
						prop="is_active"
						label="Активен"
						width="110"
						align="center"
						sortable
						v-if="isDebug"
					/>
					<el-table-column
						prop="executed_at"
						label="Запущен"
						width="250"
						sortable
						align="center"
					>
						<template #default="{ row }">
							{{ formatDateTime(row.executed_at) }}
						</template>
					</el-table-column>
					<el-table-column
						prop="finished_at"
						label="Выполнен"
						width="250"
						sortable
						align="center"
					>
						<template #default="{ row }">
							{{ formatDateTime(row.finished_at) }}
						</template>
					</el-table-column>
				</el-table>
			</template>
		</el-result>
	</div>
</template>
<script setup>
import { inject, ref } from 'vue';
import { notify } from '@/plugins/process/utils';
import { formatDate } from '@/plugins/process/utils';
import Stages from '../stages/Stages.vue';
import Statuses from '../Statuses.vue';

const props = defineProps({
	activeProcess: Object,
});

const access = inject('access');
const isDebug = inject('isDebug');
const documentId = inject('documentId');
const templateId = inject('templateId');
const { ProcessRepo } = inject('useRepo');
const setActiveProcess = inject('setActiveProcess');

/**
 * @type {Intl.DateTimeFormatOptions}
 */
const dateFormatOptions = {
	year: 'numeric',
	month: 'long',
	day: 'numeric',
	hour: 'numeric',
	minute: 'numeric',
	second: 'numeric',
};

const loading = ref(false);

const formatDateTime = date => formatDate(date, dateFormatOptions);

const deactivateCompletedProcess = async () => {
	try {
		loading.value = true;

		const activeProcess = await ProcessRepo.deactivateCompletedProcess({
			document_id: documentId.value,
			template_id: templateId.value,
		});

		setActiveProcess(activeProcess);
	} catch (e) {
		notify.fetchError(e.message);
		throw e;
	} finally {
		loading.value = false;
	}
};
</script>
<style scoped lang="scss">
.completed-process {
	&__subhead {
		margin-bottom: 0.5rem;
	}

	&__head {
		font-size: 1rem;
		font-weight: bold;
		margin-bottom: 1rem;
	}

	&__statuses {
		margin-bottom: 1rem;
	}

	&__buttons {
		display: flex;
		gap: .5rem;
		justify-content: flex-end;
	}
}
</style>