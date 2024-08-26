<template>
	<Preloader :loading="loading">
		<div class="document-template-list__header">
			<el-button
				type="primary"
				@click="$router.push({ name: 'selectRouteElementPage', params: { routeId: $route.params.id } });"
			>
				Добавить шаблон документа
			</el-button>
		</div>

		<el-table
			:data="documentTemplatesTree"
			border
			row-key="id"
			scrollbar-always-on
			default-expand-all
		>
			<el-table-column
				prop="title"
				label="Название"
				v-slot="{ row }"
			>
				<el-link
					@click="$router.push(createDocumentTemplateLink(row.type_id, 'detail', row.id, null));"
					type="primary"
					:underline="false"
				>
					{{ row.title }}
				</el-link>
			</el-table-column>

			<el-table-column
				prop="type"
				label="Тип"
				v-slot="{ row }"
			>
				{{ row.type.title }}
			</el-table-column>

			<el-table-column
				prop="creator"
				label="Создатель"
				v-slot="{ row }"
			>
				<UserLink
					v-if="row.creator"
					:user="row.creator"
					disablePhoto
				/>
			</el-table-column>

			<el-table-column
				prop="created_at"
				label="Дата создания"
				v-slot="{ row }"
			>
				{{ formatDateTime(row.created_at) }}
			</el-table-column>

			<el-table-column
				prop="last_editor"
				label="Последний редактор"
				v-slot="{ row }"
			>
				<UserLink
					v-if="row.last_editor"
					:user="row.last_editor"
					disablePhoto
				/>
			</el-table-column>

			<el-table-column
				prop="updated_at"
				label="Дата последнего изменения"
				v-slot="{ row }"
			>
				{{ formatDateTime(row.updated_at) }}
			</el-table-column>
		</el-table>

	</Preloader>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { Preloader } from '@common/shared/ui';
import { useDocumentTemplate } from "@document-routes/document-template/entities/document-template";
import { UserLink } from '@common/shared/ui'
import { formatDateTime } from '@common/shared/utils';
import { createDocumentTemplateLink } from '@document-routes/document-template/entities/document-template';

const route = useRoute();
const { documentTemplatesTree, loading, initDocumentTemplatesTree } = useDocumentTemplate();

await initDocumentTemplatesTree(route.params.id);

</script>

<style scoped lang="scss">
.document-template-list {
	&__header {
		display: flex;
		justify-content: right;
		margin-bottom: 15px;
	}
}
</style>
