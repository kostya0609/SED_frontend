<template>
	<Preloader :loading="loading">
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
					<el-descriptions-item
						label="Направление маршрута"
						v-if="documentRoute.direction"
					>
						{{ documentRoute.direction.title }}
					</el-descriptions-item>
					<el-descriptions-item label="Раздел">
						<template v-if="documentRoute.partition">
							{{ documentRoute.partition.title }}
						</template>
						<el-text
							type="info"
							v-else
						>
							Отсутствует
						</el-text>
					</el-descriptions-item>
					<el-descriptions-item
						label="Группа"
						v-if="documentRoute.group"
					>
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
					@loading="(state) => loading = state"
					disabled
				/>
			</el-col>
		</el-row>
	</Preloader>
</template>

<script setup>

import { DepartmentTree } from '../department-tree';
import { UserLink } from '@common/shared/ui';
import { formatDateTime } from '@common/shared/utils';
import { Preloader } from '@common/shared/ui';
import { ref } from 'vue';

const props = defineProps({
	documentRoute: Object,
});

const loading = ref(false);

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