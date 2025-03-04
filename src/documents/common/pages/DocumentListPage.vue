<template>
	<div>
		<BsiTable
			filterable
			searchable
			border
			id="sed-documents-table"
			:filter="filter"
			:change="handleChangeSettings"
			storage="local"
			:customizable="false"
		>
			<BsiTableColumn
				prop="number"
				label="Номер"
				sortable="custom"
				width="250"
				v-slot="{ row }"
			>
				<Link
					title="Перейти в документ"
					:href="createDocumentLink(row.type_id, 'detail', row.document_id)"
					@click="handleClickLink"
				>
				{{ row.number }}
				</Link>
			</BsiTableColumn>
			<BsiTableColumn
				prop="type_id"
				label="Тип документа"
				v-slot="{ row }"
				sortable="custom"
			>
				{{ row.type.title }}
			</BsiTableColumn>
			<BsiTableColumn
				prop="status_title"
				label="Статус"
				sortable="custom"
			/>
			<BsiTableColumn
				prop="theme"
				label="Тема документа"
			/>
			<BsiTableColumn
				prop="initiator_id"
				label="Инициатор"
				v-slot="{ row }"
				sortable="custom"
			>
				<UserLink
					v-if="row.initiator"
					:user="row.initiator"
					:full-name="false"
					style-v2
				/>
			</BsiTableColumn>
			<BsiTableColumn
				prop="created_at"
				label="Дата создания"
				v-slot="{ row }"
				sortable="custom"
			>
				{{ formatDate(row.created_at) }}
			</BsiTableColumn>
		</BsiTable>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { UserLink, Link } from '@common/shared/ui';
import { BsiTable, BsiTableColumn } from '@/plugins/bsi-table';
import { DocumentRepo, useActiveList } from "@documents/common/entities/document";
import { createDocumentLink } from '@documents/common/entities/document';
import { updateNeedActionCount } from '@documents/common/features/need-action-count';
import { updateNeedActionSubuserCount } from '@documents/common/features/need-action-subuser-count';

import { useUser } from "@/common/app/composables";
const { setActiveList } = useActiveList();

const { user } = useUser();

const filter = ref([
	{
		column: 'number',
		type: 'string',
		title: 'Номер',
		value: null,
		operator: 8,
	},
	{
		column: 'type_id',
		type: 'select-options',
		title: 'Тип документа',
		value: [],
		options: [
			{
				id: 1,
				name: 'ЭСЗ',
			},
			{
				id: 2,
				name: 'Поручение',
			},
			{
				id: 3,
				name: 'Ознакомление',
			},

		],
		disabled: true,
		operator: 14,
	},
	{
		column: 'status_title',
		type: 'select-options',
		title: 'Статус',
		value: [],
		options: (await DocumentRepo.getAllStatuses()).map(status => ({ id: status, name: status })),
		disabled: true,
		operator: 14,
	},
	{
		column: 'created_at',
		type: 'date',
		title: 'Дата создания',
		value: null,
		operator: 1,
	},

])

const formatDate = (date, options = {
	year: 'numeric',
	month: 'numeric',
	day: 'numeric',
}) => new Date(date).toLocaleString('ru', options);

await updateNeedActionCount();
await updateNeedActionSubuserCount();


const handleChangeSettings = async ({ paginate, filter, sort, search }) => {

	const result = await await DocumentRepo.getAll({
		paginate,
		sort,
		filter,
		search,
		user_id: user.id,
	});

	return result;
};

const handleClickLink = () => {
	setActiveList('/sed');
};
</script>