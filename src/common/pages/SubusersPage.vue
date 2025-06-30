<template>
	<div>
		<BsiTable
			filterable
			searchable
			border
			id="sed-subusers-table"
			:filter="filter"
			:change="handleChangeSettings"
			storage="local"
			:customizable="false"
		>
			<BsiTableColumn
				prop="replace_user"
				label="Сотрудник"
				v-slot="{ row }"
				sortable="custom"
			>
				<UserLink
					v-if="row.replace_user"
					:user="row.replace_user"
					:full-name="false"
					style-v2
				/>
			</BsiTableColumn>

			<BsiTableColumn
				prop="sub_user"
				label="Заместитель"
				v-slot="{ row }"
				sortable="custom"
			>
				<UserLink
					v-if="row.sub_user"
					:user="row.sub_user"
					:full-name="false"
					style-v2
				/>
			</BsiTableColumn>

			<BsiTableColumn
				prop="module"
				label="Название модуля"
				v-slot="{ row }"
				sortable="custom"
			>
				{{ row.module.name }}
			</BsiTableColumn>

			<BsiTableColumn
				prop="date_final"
				label="Дата завершения"
				v-slot="{ row }"
				sortable="custom"
			>
				{{ row?.date_final || 'Без срока'  }}
			</BsiTableColumn>

			<BsiTableColumn
				prop="created_at"
				label="Дата создания"
				v-slot="{ row }"
				sortable="custom"
			>
				{{ row.created_at }}
			</BsiTableColumn>
			<BsiTableColumn
				prop="updated_at"
				label="Дата последнего изменения"
				v-slot="{ row }"
				sortable="custom"
			>
				{{ row.updated_at }}
			</BsiTableColumn>
		</BsiTable>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { UserLink, Link } from '@common/shared/ui';
import { BsiTable, BsiTableColumn } from '@/plugins/bsi-table';
import { SubuserRepo } from "@common/shared/api";

import { useUser } from "@/common/app/composables";

const { user } = useUser();

const filter = ref([
	{
		column: 'replace_user_id',
		type: 'search-user',
		title: 'Сотрудник',
		disabled: true,
		value: [],
		operator: 14,
	},
	{
		column: 'sub_user_id',
		type: 'search-user',
		title: 'Заместитель',
		disabled: true,
		value: [],
		operator: 14,
	},
	{
		column: 'date_final',
		type: 'date',
		title: 'Дата завершения',
		value: null,
		operator: 1,
	},
	{
		column: 'created_at',
		type: 'date',
		title: 'Дата создания',
		value: null,
		operator: 1,
	},
	{
		column: 'updated_at',
		type: 'date',
		title: 'Дата последнего редактирования',
		value: null,
		operator: 1,
	},


])

const handleChangeSettings = async ({ paginate, filter, sort, search }) => {

	const result = await await SubuserRepo.getAll({
		paginate,
		sort,
		filter,
		search,
		user_id: user.id,
	});

	return result;
};


</script>