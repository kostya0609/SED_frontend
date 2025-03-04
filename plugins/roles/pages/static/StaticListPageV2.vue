<template>
	<Preloader :loading="loading">

		<el-breadcrumb
			separator="/"
			class="mb-3"
		>
			<el-breadcrumb-item
				v-for="item in breadcrumbs"
				:key="item.id"
				:to="{ path: `/sed/admin/roles/statics-v2/${item.id || ''}` }"
			>{{ item.title }}</el-breadcrumb-item>
		</el-breadcrumb>

		<div class="list-static-role-page">

			<div
				v-if="showPartition"
				class="list-static-role-page__tree"
			>
				<el-scrollbar>
					<PartitionTree
						:data="partitionsTree"
						@edit="editPartition"
						@delete="deletePartitionMsg"
						@click="clickPartition"
					/>
				</el-scrollbar>
			</div>

			<div class="list-static-role-page__table">
				<BsiTable
					v-model:data="tableData"
					v-model:total="total"
					searchable
					filterable
					border
					:change="handleChangeSettings"
					:filter="filter"
					storage="local"
					id="static-roles-table"
					ref='bsiTable'
				>
					<template #prepend-header>
						<el-popover
							placement="top-start"
							trigger="hover"
							:content="showPartition ? 'Скрыть разделы' : 'Отобразить разделы'"
						>
							<template #reference>
								<el-button @click="showPartition = !showPartition">
									<el-icon>
										<Expand v-if="showPartition" />
										<Fold v-else />
									</el-icon>
								</el-button>
							</template>
						</el-popover>

					</template>

					<BsiTableColumn
						prop="_id"
						label="ID"
						align="center"
						width="70"
						v-slot="{ row }"
					>
						{{ row.id }}

					</BsiTableColumn>

					<BsiTableColumn
						prop="title"
						label="Название"
						sortable="custom"
						width="500"
						v-slot="{ row }"
					>
						<el-link
							type="primary"
							:underline="false"
							@click="goTo(row.id, row.type)"
						>
							<el-icon
								v-if="row.type == 'partition'"
								class="pe-2"
								size=20
							>
								<Folder />
							</el-icon>
							{{ row.title }}
						</el-link>
					</BsiTableColumn>

					<BsiTableColumn
						prop="is_active"
						label="Акт-ть"
						sortable="custom"
						width="100"
						v-slot="{ row }"
					>
						{{ row.is_active ? 'Да' : 'Нет' }}
					</BsiTableColumn>

					<BsiTableColumn
						prop="creator"
						label="Создатель"
						sortable="custom"
						width="150"
						v-slot="{ row }"
					>
						<UserLink
							v-if="row.creator"
							:user="row.creator"
							disable-photo
							:full-name="false"
						/>
					</BsiTableColumn>

					<BsiTableColumn
						prop="editor"
						label="Редактор"
						sortable="custom"
						width="150"
						v-slot="{ row }"
					>
						<UserLink
							v-if="row.editor"
							:user="row.editor"
							disable-photo
							:full-name="false"
						/>
					</BsiTableColumn>

					<BsiTableColumn
						prop="updated_at"
						label="Дата изменения"
						sortable="custom"
						width="170"
						v-slot="{ row }"
					>
						{{ formatDateTime(row.updated_at, formateDataTimeOptions) }}
					</BsiTableColumn>

				</BsiTable>
			</div>
		</div>

		<PartitionModal
			v-if="partitionModalAttrs.show"
			v-model:show="partitionModalAttrs.show"
			:mode="partitionModalAttrs.mode"
			:data="partitionModalAttrs.data"
			@update="update"
		/>
	</Preloader>

</template>

<script setup>
import { ref, watch, onMounted, onUnmounted, reactive } from "vue";
import { BsiTable, BsiTableColumn } from '@/plugins/bsi-table';
import { PartitionTree, PartitionModal } from '@/plugins/roles/entities/static-role-partition/ui';

import { useStaticRolePartitionRepo } from "@/plugins/roles/entities/static-role-partition/api";
import { usePartitionTree } from "@/plugins/roles/entities/static-role-partition/models";

import { useStaticRoleRepo } from '@/plugins/roles/entities/static-role/api';

import { useUser } from '@common/app/composables';
import { UserLink, Preloader } from '@common/shared/ui'
import { formatDateTime } from '@/common/shared/utils';

import { useRouter, useRoute } from 'vue-router';
import { useActionButtons } from '@/plugins/menu';

import { ElMessageBox } from 'element-plus';

const router = useRouter();
const route = useRoute();

const { user } = useUser();

const PartitionRepo = useStaticRolePartitionRepo();
const { partitionsTree, breadcrumbs, initPartitionsTree, loading, deletePartition, getBreadcrumbs } = usePartitionTree(PartitionRepo);

const StaticRoleRepo = useStaticRoleRepo();

const { addButton, clearButtons } = useActionButtons();

const bsiTable = ref();

const partitionModalAttrs = reactive({
	show: false,
	mode: 'create',
	data: { id: null, title: null, is_active: true },
});

const tableData = ref([]);

const total = ref(null);
const showPartition = ref(true);

const filter = [
	{
		column: 'title',
		type: 'string',
		title: 'Название',
		value: null,
		operator: null,
	},
];

const formateDataTimeOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
}

await initPartitionsTree();
await getBreadcrumbs({ id: route.params.partition_id });

const clickPartition = async (partition) => {
	if(partition.id != route.params.partition_id)
		await router.push({ path: `/sed/admin/roles/statics-v2/${partition.id}`, force: true });
};

const editPartition = (partition) => {
	partitionModalAttrs.mode = 'edit';
	partitionModalAttrs.data.id = partition.id;
	partitionModalAttrs.data.title = partition.title;
	partitionModalAttrs.data.is_active = partition.is_active;
	partitionModalAttrs.show = true;
};

const deletePartitionMsg = (partition) => {

	ElMessageBox.confirm(`Вы уверены, что хотите удалить раздел ${partition.title} ?`, {
		type: 'warning',
		callback: async (action) => {
			if (action !== 'confirm') {
				return;
			}			
			await deletePartition({ id: partition.id });
			await router.back();
			await initPartitionsTree();
			await getBreadcrumbs({ id: route.params.partition_id });
		},
	});
};

const update = async () => {
	await initPartitionsTree();
	await bsiTable.value.forceUpdate();
}

const handleChangeSettings = async ({ paginate, filter, sort, search }) => {
	return await StaticRoleRepo.getRoleByParentId({
		paginate,
		sort,
		filter,
		search,
		user_id: user.id,
		parent_id: route.params.partition_id,
	});
};

const goTo = async (id, type) => {
	if (type == 'partition') await router.push({ path: `/sed/admin/roles/statics-v2/${id}`, force: true });

	if (type == 'role') router.push({ name: 'staticDetailPage', params: { id: id } });
};

watch(
	() => route.fullPath,
	async () => {
		await bsiTable.value.forceUpdate();
		await getBreadcrumbs({ id: route.params.partition_id });
	}
);

onMounted(() => {
	addButton({
		title: 'раздел',
		icon: 'Plus',
		onClick: () => {
			partitionModalAttrs.mode = 'create';
			partitionModalAttrs.show = true;
		},
	});
	addButton({
		title: 'Роль',
		icon: 'Plus',
		onClick: () => {
			router.push({ path: `/sed/admin/roles/statics/create/${route.params.partition_id}` });
		}
	});
	addButton({
		icon: 'Back',
		path: '/sed/',
		type: 'default'
	});
});

onUnmounted(() => {
	clearButtons();
});

</script>
<style scoped lang="scss">
.list-static-role-page {
	display: flex;
	gap: 10px;

	&__tree {
		flex: 0 0 300px;
		padding: 0 5px;
		border: 1px solid var(--el-border-color-lighter);
		overflow-x: auto;
	}

	&__table {
		overflow: hidden;
	}
}

.list-static-role-page ::v-deep(.bsi-table__footer) {
	display: none;
}

.list-static-role-page ::v-deep(.filter-button) {
	display: none;
}
</style>
