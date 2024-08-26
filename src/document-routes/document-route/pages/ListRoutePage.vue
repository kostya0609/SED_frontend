<template>
	<BsiTable
		filterable
		searchable
		border
		:change="handleChangeSettings"
		storage="local"
		id="documet-routes-table"
		scrollbar-always-on
	>
		<BsiTableColumn
			prop="_actions"
			align="center"
			width="120"
			v-slot="{ row }"
		>
			<el-button-group>
				<el-button
					icon="Document"
					type="primary"
					size="small"
					@click="$router.push({ name: 'detailDocumentRoutePage', params: { id: row.id } });"
				/>
				<el-button
					icon="Edit"
					type="primary"
					size="small"
					@click="$router.push({ name: 'editDocumentRoutePage', params: { id: row.id } });"
				/>
			</el-button-group>
		</BsiTableColumn>

		<BsiTableColumn
			prop="id"
			label="ID"
			sortable="custom"
		/>

		<BsiTableColumn
			prop="title"
			label="Название"
			sortable="custom"
		/>

		<BsiTableColumn
			prop="group"
			label="Группа"
			sortable="custom"
			v-slot="{ row }"
		>
			{{ row.group.title }}
		</BsiTableColumn>

		<BsiTableColumn
			prop="direction"
			label="Направление"
			sortable="custom"
			v-slot="{ row }"
		>
			{{ row.direction.title }}
		</BsiTableColumn>

		<BsiTableColumn
			prop="creator"
			label="Создатель"
			sortable="custom"
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
			v-slot="{ row }"
		>
			{{ formatDateTime(row.created_at) }}
		</BsiTableColumn>

		<BsiTableColumn
			prop="last_editor"
			label="Последний редактор"
			sortable="custom"
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

const { setDefaultTab} = useActiveTab();  
setDefaultTab();

const { user } = useUser();

const handleChangeSettings = async ({ paginate, filter, sort, search }) => {

	return await DocumentRouteRepo.list({
		paginate,
		sort,
		filter,
		search,
		user_id: user.id,
	});

};

</script>
