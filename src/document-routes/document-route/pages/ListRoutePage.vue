<template>
	<BsiTable
		searchable
		filterable
		border
		:change="handleChangeSettings"
		:filter="filter"
		storage="local"
		id="documet-routes-table"
	>
		<BsiTableColumn
			prop="_actions"
			align="center"
			width="150"
			v-slot="{ row }"
		>
			<el-dropdown
				split-button
				trigger="click"
				@click="goTo(row.id)"
				@command="(command) => handleDropdownCommand(command, row.id)"
			>
				Перейти
				<template #dropdown>
					<el-dropdown-menu>
						<el-dropdown-item
							command="edit"
							icon="Edit"
						>
							Редактировать
						</el-dropdown-item>
					</el-dropdown-menu>
				</template>
			</el-dropdown>
		</BsiTableColumn>

		<BsiTableColumn
			prop="id"
			label="ID"
			sortable="custom"
			width="50"
			align="center"
		/>

		<BsiTableColumn
			prop="title"
			label="Название"
			sortable="custom"
			width="300"
			v-slot="{ row }"
		>
			<el-link
				type="primary"
				:underline="false"
				@click="goTo(row.id)"
			>
				{{ row.title }}
			</el-link>
		</BsiTableColumn>

		<BsiTableColumn
			prop="partition"
			label="Раздел"
			sortable="custom"
			width="150"
			v-slot="{ row }"
		>
			{{ row.partition ? row.partition.title : '' }}
		</BsiTableColumn>

		<BsiTableColumn
			prop="is_active"
			label="Активность"
			sortable="custom"
			width="140"
			v-slot="{ row }"
		>
			{{ row.is_active ? 'Да' : 'Нет' }}
		</BsiTableColumn>

		<BsiTableColumn
			prop="creator"
			label="Создатель"
			sortable="custom"
			width="300"
			v-slot="{ row }"
		>
			<UserLink
				v-if="row.creator"
				:user="row.creator"
				disablePhoto
			/>
		</BsiTableColumn>

		<BsiTableColumn
			prop="created_at"
			label="Дата создания"
			sortable="custom"
			width="220"
			v-slot="{ row }"
		>
			{{ formatDateTime(row.created_at) }}
		</BsiTableColumn>

		<BsiTableColumn
			prop="last_editor"
			label="Последний редактор"
			sortable="custom"
			width="300"
			v-slot="{ row }"
		>
			<UserLink
				v-if="row.last_editor"
				:user="row.last_editor"
				disablePhoto
			/>
		</BsiTableColumn>

		<BsiTableColumn
			prop="updated_at"
			label="Дата последнего изменения"
			sortable="custom"
			width="220"
			v-slot="{ row }"
		>
			{{ formatDateTime(row.updated_at) }}
		</BsiTableColumn>

	</BsiTable>
</template>

<script setup>
import { BsiTable, BsiTableColumn } from '@/plugins/bsi-table';
import { DocumentRouteRepo } from '@document-routes/document-route/entities/document-route';
import { useUser } from '@common/app/composables';
import { UserLink } from '@common/shared/ui'
import { formatDateTime } from '@/common/shared/utils';
import { useActiveTab } from "@document-routes/document-route/entities/document-route";
import { useRouter } from 'vue-router';

const { setDefaultTab } = useActiveTab();
setDefaultTab();

const { user } = useUser();
const router = useRouter();

const filter = [
	{
		column: 'id',
		type: 'number',
		title: 'ID',
		value: null,
		operator: null,
	},
	{
		column: 'title',
		type: 'string',
		title: 'Название',
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
	{
		column: 'updated_at',
		type: 'date',
		title: 'Дата последнего изменения',
		value: null,
		operator: null,
	}
];

const handleChangeSettings = async ({ paginate, filter, sort, search }) => {

	return await DocumentRouteRepo.list({
		paginate,
		sort,
		filter,
		search,
		user_id: user.id,
	});

};

const goTo = (id) => {
	router.push({ name: 'detailDocumentRoutePage', params: { id: id } });
};

const handleDropdownCommand = async (command, id) => {
	switch (command) {
		case 'edit':
			router.push({ name: 'editDocumentRoutePage', params: { id: id } });
			break;
	}
};
</script>
