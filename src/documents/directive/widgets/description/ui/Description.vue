<template>
	<el-descriptions
		border
		:column="1"
	>
		<el-descriptions-item label="Номер">
			{{ document.number }}
		</el-descriptions-item>

		<el-descriptions-item label="Тип документа">
			{{ document.type.title }}
		</el-descriptions-item>

		<el-descriptions-item label="Статус">
			{{ document.status.title }}
		</el-descriptions-item>

		<el-descriptions-item label="Тема">
			<ThemeWithAdminLinks
				:template-document="document.template_document"
				:theme-title="document.theme"
			/>
		</el-descriptions-item>

		<el-descriptions-item label="Дата создания">
			{{ formatDateTime(document.created_at) }}
		</el-descriptions-item>

		<el-descriptions-item label="Срок исполнения">
			{{ formatDateTime(document.executed_at, {
				year: 'numeric',
				month: 'long',
				day: 'numeric',
			}) }}
		</el-descriptions-item>

		<el-descriptions-item label="Документ основание">
			<template v-if="document.parent_document">
				<el-link
					:underline="false"
					:href="createDocumentLink(document.parent_document.type_id, 'detail', document.parent_document.document_id)"
					target="_blank"
					type="primary"
					@click="() => setDocumentId(document.parent_document.id)"
				>
					{{ document.parent_document.number }}
				</el-link>
			</template>
			<el-text
				type="info"
				v-else
			>
				Отсутствует
			</el-text>
		</el-descriptions-item>

		<el-descriptions-item label="Содержание документа">
			{{ document.contents.content }}
		</el-descriptions-item>

		<el-descriptions-item label="Основные файлы">
			<AttachmentList
				v-if="document.main_files.length > 0"
				:attachments="document.main_files"
			/>
			<el-text
				type="info"
				v-else
			>
				Отсутствуют
			</el-text>
		</el-descriptions-item>
		<el-descriptions-item label="Описание портфеля документов">
			<template v-if="document.contents && document.contents.portfolio">
				{{ document.contents.portfolio }}
			</template>
			<el-text
				type="info"
				v-else
			>
				Отсутствует
			</el-text>
		</el-descriptions-item>

		<el-descriptions-item label="Создатель">
			<UserLink :user="document.creator.user" />
		</el-descriptions-item>

		<el-descriptions-item label="Автор">
			<UserLink
				:user="document.author.user"
				v-if="document.author"
			/>
			<el-text
				type="danger"
				v-else
			>
				ОТСУТСТВУЕТ (НЕОБХОДИМО УКАЗАТЬ)
			</el-text>
		</el-descriptions-item>

		<el-descriptions-item label="Исполнители">
			<ParticipantList
				:participants="document.executors"
				v-if="document.executors.length"
			/>
			<el-text
				type="danger"
				v-else
			>
				ОТСУТСТВУЮТ (НЕОБХОДИМО УКАЗАТЬ)
			</el-text>
		</el-descriptions-item>

		<el-descriptions-item label="Контроллер">
			<ParticipantList
				v-if="document.controllers.length > 0"
				:participants="document.controllers"
			/>
			<el-text
				type="info"
				v-else
			>
				Отсутствуют
			</el-text>
		</el-descriptions-item>

		<el-descriptions-item label="Наблюдатели">
			<ParticipantList
				v-if="document.observers.length > 0"
				:participants="document.observers"
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
import { UserLink, ParticipantList, AttachmentList } from '@/common/shared/ui';
import { formatDateTime } from '@/common/shared/utils';
import { createDocumentLink } from '@documents/common/entities/document/';
import { ThemeWithAdminLinks } from '@/documents/common/features/theme-with-admin-links';
import { setDocumentId } from '@documents/common/features/selected-document-ids';

defineProps({
	document: Object,
});
</script>

<style scoped lang="scss">
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