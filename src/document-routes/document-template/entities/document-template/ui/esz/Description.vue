<template>
	<el-descriptions
		border
		:column="1"
		class="document-template-description"
	>
		<el-descriptions-item label="Элемент">
			{{ documentTemplate.type.title }}
		</el-descriptions-item>

		<el-descriptions-item label="Тема документа">
			{{ documentTemplate.title }}
		</el-descriptions-item>

		<el-descriptions-item label="Родительский шаблон документа">
			{{ documentTemplate.parent ? documentTemplate.parent.title : 'отсутствует' }}
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

		<el-descriptions-item label="Подписант">
			<UserLink :user="documentTemplate.data.signatory" />
		</el-descriptions-item>

		<el-descriptions-item label="Адресат">
			<ParticipantListDocTmp :participants="documentTemplate.data.receivers" />
		</el-descriptions-item>

		<el-descriptions-item label="Наблюдатели">
			<ParticipantListDocTmp
				v-if="documentTemplate.data.observers.length > 0"
				:participants="documentTemplate.data.observers"
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
