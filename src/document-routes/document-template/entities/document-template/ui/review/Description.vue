<template>
	<el-descriptions
		border
		:column="1"
		class="document-template-description"
	>
		<el-descriptions-item label="Тип документа">
			{{ documentTemplate.type.title }}
		</el-descriptions-item>

		<el-descriptions-item label="Тема документа">
			{{ documentTemplate.title }}
		</el-descriptions-item>

		<el-descriptions-item label="Маршрут шаблона">
			<el-link
				:href="`/sed/admin/document-routes/detail/${documentTemplate.route.id}`"
				:underline="false"
				type="primary"
			>
				{{ documentTemplate.route.title }}
			</el-link>
		</el-descriptions-item>

		<el-descriptions-item label="Родительские шаблоны">
			<el-text
				type="info"
				v-if="!documentTemplate.parents.length"
			>
				Отсутствуют
			</el-text>
			<TemplateList :templates="documentTemplate.parents" />
		</el-descriptions-item>

		<el-descriptions-item label="Содержание документа">
			{{ documentTemplate.data.content }}
		</el-descriptions-item>

		<el-descriptions-item label="Активность">
			{{ documentTemplate.is_active ? 'Активен' : 'Не активен' }}
		</el-descriptions-item>

		<el-descriptions-item label="Стартовый">
			{{ documentTemplate.is_start ? 'Да' : 'Нет' }}
		</el-descriptions-item>

		<el-descriptions-item label="Создатель">
			<UserLink :user="documentTemplate.creator" />
		</el-descriptions-item>

		<el-descriptions-item label="Дата создания">
			{{ formatDateTime(documentTemplate.created_at) }}
		</el-descriptions-item>

		<el-descriptions-item label="Последний редактор">
			<UserLink :user="documentTemplate.last_editor" />
		</el-descriptions-item>

		<el-descriptions-item label="Дата последнего изменения">
			{{ formatDateTime(documentTemplate.updated_at) }}
		</el-descriptions-item>

		<el-descriptions-item label="Получающие ознакомления">
			<ParticipantListDocTmp
				:participants="documentTemplate.data.receivers"
				v-if="documentTemplate.data.receivers.length > 0"
			/>
			<el-text
				type="info"
				v-else
			>
				Отсутствуют
			</el-text>
		</el-descriptions-item>

	</el-descriptions>
</template>

<script setup>
import { UserLink, ParticipantListDocTmp } from '@common/shared/ui';
import { formatDateTime } from '@common/shared/utils';
import TemplateList from '../TemplateList.vue';

const props = defineProps({
	documentTemplate: {
		type: Object,
		required: true,
		default: null,
	},
});
</script>
<style>
.document-template-description .el-descriptions__label.el-descriptions__cell.is-bordered-label {
	width: 300px;
}
</style>
