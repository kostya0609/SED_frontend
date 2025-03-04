<template>
	<BsiTable
		:customizable="false"
		searchable
		border
		:change="handleChangeSettings"
		storage="local"
		id="sed-automation-table"
	>
		<BsiTableColumn
			prop="id"
			label="ID"
			sortable="custom"
			width="80"
			align="center"
		/>
		<BsiTableColumn
			prop="is_active"
			label="Активно"
			width="120"
			align="center"
			v-slot="{ row }"
		>
			<el-switch
				v-model="row.is_active"
				:active-value="1"
				:inactive-value="0"
				@change="handleChangeIsActive(row.id, row.is_active)"
				v-if="row.id"
			/>
		</BsiTableColumn>
		<BsiTableColumn
			prop="title"
			label="Название"
			sortable
		/>
	</BsiTable>
</template>
<script setup>
import { AutomationRepo } from '../api';
import { BsiTable, BsiTableColumn } from '@/plugins/bsi-table';
import { useDocumentTemplate } from '@/document-routes/document-template/entities/document-template';

const { documentTemplate } = useDocumentTemplate();

const handleChangeSettings = async ({ paginate, filter, sort, search }) => {

	return await AutomationRepo.getAll({
		paginate,
		sort,
		filter,
		search,
		tmp_doc_id: documentTemplate.value.id,
	});

};

const handleChangeIsActive = async (id, is_active) => {
	await AutomationRepo.updateIsActive({
		id,
		tmp_doc_id: documentTemplate.value.id,
		is_active,
	});
};
</script>