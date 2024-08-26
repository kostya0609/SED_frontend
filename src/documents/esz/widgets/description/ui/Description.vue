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
			{{ document.theme }}
		</el-descriptions-item>

		<el-descriptions-item label="Дата создания">
			{{ formatDateTime(document.created_at) }}
		</el-descriptions-item>

		<el-descriptions-item label="Документ основания">
			<template v-if="document.parent">
				{{ document.parent.number }}
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

		<el-descriptions-item label="Инициатор">
			<UserLink :user="document.initiator.user" />
		</el-descriptions-item>

		<el-descriptions-item label="Подписант">
			<UserLink :user="document.signatory.user" />
		</el-descriptions-item>

		<el-descriptions-item label="Адресат">
			<ParticipantList :participants="document.receivers" />
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

		<el-descriptions-item label="Дополнительные файлы">
			<AttachmentList
				v-if="document.additional_files.length > 0"
				:attachments="document.additional_files"
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