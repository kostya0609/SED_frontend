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

		<el-descriptions-item label="Дни исполнения">
			<template v-if="documentTemplate.data.days_amount">
				{{ documentTemplate.data.days_amount }}
			</template>
			<el-text
				type="info"
				v-else
			>
				Отсутствуют
			</el-text>
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

		<el-descriptions-item label="Автор">
			<Participant
				:participant="documentTemplate.data.author"
				v-if="documentTemplate.data.author"
			/>
			<el-text
				type="info"
				v-else
			>
				Отсутствует
			</el-text>
		</el-descriptions-item>

		<el-descriptions-item label="Исполнители">
			<ParticipantListDocTmp
				:participants="documentTemplate.data.executors"
				v-if="documentTemplate.data.executors.length > 0"
			/>
			<el-text
				type="info"
				v-else
			>
				Отсутствуют
			</el-text>
		</el-descriptions-item>

		<el-descriptions-item label="Контроллер">
			<ParticipantListDocTmp
				v-if="documentTemplate.data.controllers.length > 0"
				:participants="documentTemplate.data.controllers"
			/>
			<el-text
				type="info"
				v-else
			>
				Отсутствуют
			</el-text>
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
import { UserLink, ParticipantListDocTmp, Participant } from '@common/shared/ui';
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
