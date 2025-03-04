<template>
	<BsiTable
		filterable
		:filter="filter"
		border
		:change="handleChangeSettings"
		storage="local"
		id="sed-report-table"
		class="report-table"
	>
		<template #prepend-footer>
			<GenerateReport />
		</template>
		<BsiTableColumn
			prop="id"
			label="ID"
			width="80"
			align="center"
			sortable="custom"
		/>
		<BsiTableColumn
			prop="created_at"
			label="Дата создания"
			align="center"
			width="250"
			sortable="custom"
			v-slot="{ row }"
		>
			{{ formatDateTime(row.created_at) }}
		</BsiTableColumn>
		<BsiTableColumn
			prop="_actions"
			align="center"
			width="150"
			v-slot="{ row }"
		>
			<DownloadReport
				:report-file-id="row.file.id"
				v-if="row.file"
			/>
		</BsiTableColumn>
	</BsiTable>
</template>
<script setup>
import { DownloadReport } from '@report/features/download-report';
import { GenerateReport } from '@report/features/generate-report';
import { BsiTable, BsiTableColumn } from '@/plugins/bsi-table';
import { ReportRepo } from '@report/entities/report';
import { useUser } from '@/common/app/composables';
import { formatDateTime } from '@/common/shared/utils';
import { ref } from 'vue';

const { user } = useUser();

const filter = ref([
	{
		column: 'id',
		type: 'number',
		title: 'ID',
		value: null,
		operator: null,
	},
	{
		column: 'created_at',
		type: 'date',
		title: 'Дата создания',
		value: null,
		operator: null,
	},
]);

const handleChangeSettings = async ({ paginate, filter, sort, search }) => {
	const result = await ReportRepo.getAll({
		paginate,
		sort,
		filter,
		search,
		user_id: user.id,
	});

	return result;
};
</script>
<style scoped lang="scss">
.report-download-link {
	gap: .25rem;
}
</style>