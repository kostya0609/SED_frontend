<template>
	<el-row :gutter="20">
		<el-col :md="12">
			<el-descriptions
				border
				:column="1"
			>
				<el-descriptions-item label="ID маршрута">
					{{ documentRoute.id }}
				</el-descriptions-item>
				<el-descriptions-item label="Наименование маршрута">
					{{ documentRoute.title }}
				</el-descriptions-item>
				<el-descriptions-item label="Создатель">
					<UserLink :user="documentRoute.creator" />
				</el-descriptions-item>
				<el-descriptions-item label="Дата создания">
					{{ formatDateTime(documentRoute.created_at) }}
				</el-descriptions-item>
				<el-descriptions-item label="Последний редактор">
					<UserLink :user="documentRoute.last_editor" />
				</el-descriptions-item>
				<el-descriptions-item label="Дата последнего изменения">
					{{ formatDateTime(documentRoute.updated_at) }}
				</el-descriptions-item>
				<el-descriptions-item label="Направление маршрута">
					{{ documentRoute.direction.title }}
				</el-descriptions-item>
				<el-descriptions-item label="Раздел">
					{{ documentRoute.partition.title }}
				</el-descriptions-item>
				<el-descriptions-item label="Группа">
					{{ documentRoute.group.title }}
				</el-descriptions-item>
				<el-descriptions-item label="Активность">
					{{ documentRoute.is_active ? 'Активен' : 'Не активен' }}
				</el-descriptions-item>
				<el-descriptions-item label="Описание">
					{{ documentRoute.description }}
				</el-descriptions-item>
			</el-descriptions>
		</el-col>

		<el-col :md="12">
			<DepartmentTree
				v-model="departments"
				disabled
			/>
		</el-col>
	</el-row>
</template>

<script setup>

import { DepartmentTree } from '../department-tree';
import { UserLink } from '@common/shared/ui';
import { formatDateTime } from '@common/shared/utils';
import { ref } from 'vue';

const props = defineProps({
	documentRoute: Object,
});

const departments = ref([]);
departments.value = props.documentRoute.departments.map(el => el.department_id);
</script>

<style lang="scss" scoped>
:global(.el-checkbox__input.is-disabled + span.el-checkbox__label) {
	color: var(--el-checkbox-checked-text-color) !important;
}

::v-deep(.el-descriptions__label.el-descriptions__cell.is-bordered-label) {
	width: 300px;
}

::v-deep(.el-descriptions__table tr:nth-child(odd) td) {
	background: var(--el-fill-color-lighter);
}

::v-deep(.el-descriptions__table tr:nth-child(even) td) {
	background: var(--el-table-tr-bg-color);
}
</style>