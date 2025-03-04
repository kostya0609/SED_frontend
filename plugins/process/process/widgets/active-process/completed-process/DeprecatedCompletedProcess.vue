<template>
	<el-result
		icon="success"
		title="Этап завершен!"
	>
		<template #extra>
			<AllowCreateProcessButton
				v-if="access.full"
				class="mb-4"
			/>
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
</template>
<script setup>
import { inject } from 'vue';
import { useActiveProcess } from '@/plugins/process/common';
import { formatDate, useProcessProvider } from '@/plugins/process/common';
import { AllowCreateProcessButton } from '@/plugins/process/process/features/process';

const { activeProcess } = useActiveProcess();
const { isDebug } = useProcessProvider();

const access = inject('access');

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

const formatDateTime = date => formatDate(date, dateFormatOptions);
</script>