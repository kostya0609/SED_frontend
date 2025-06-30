<template>
	<el-form-item
		label="Элемент"
		class="form__item"
	>
		<div class="header_h3">
			Поручение
			<span
				class="color-danger"
				v-if="mode === 'edit' && checkDocumentStatus(DOCUMENT_STATUS.DRAFT)"
			>
				(ЧЕРНОВИК)
			</span>
		</div>
	</el-form-item>

	<el-form-item
		label="Тема документа"
		class="form__item"
		prop="theme"
		required
	>
		<SelectDocumentTemplate
			v-model:theme-title="formData.theme.theme_title"
			v-model:tmp-doc-id="formData.theme.tmp_doc_id"			
			@change-template="handleChangeTemplate"
			@reset-template="resetTemplate"
			:document-type="DOCUMENT_TYPE.DIRECTIVE"
			force-disabled
			v-if="mode !== 'edit'"
		/>
		<span
			class="line-height-normal"
			v-else
		>{{ formData.theme.theme_title }}</span>
	</el-form-item>
	<el-form-item
		label="Срок исполнения"
		class="form__item"
		prop="executed_at"
	>
		<el-date-picker
			v-model="formData.executed_at"
			class="directive-date-picker"
			type="date"
			format="DD.MM.YYYY"
			valueFormat="DD.MM.YYYY"
			placeholder="Срок исполнения"
		>
		</el-date-picker>
	</el-form-item>

	<el-form-item
		label="Содержание документа"
		class="form__item"
		prop="content"
	>
		<el-input
			v-model="formData.content"
			type="textarea"
			:rows="3"
			placeholder="Содержание документа"
		/>
	</el-form-item>

	<el-form-item
		class="form__item"
		prop="main"
		label="Основные файлы"
	>
		<UploadFile
			v-model:file-list="formData.main"
			multiple
			style-v2
		/>
	</el-form-item>

	<el-form-item
		class="form__item"
		prop="portfolio"
		label="Описание портфеля документов"
	>
		<el-input
			v-model="formData.portfolio"
			type="textarea"
			:rows="3"
			placeholder="Описание портфеля документов"
			class="form__input"
		/>
	</el-form-item>

	<h3 class="header_h3">Участники процесса</h3>

	<el-form-item
		label="Создатель:"
		class="form__item"
		prop="creator"
	>
		<UserLink :user="formData.creator" />
	</el-form-item>

	<el-form-item
		label="Автор:"
		class="form__item"
		prop="author"
	>
		<UserSearchV2
			v-model="formData.author"
			:disabled="!canParticipantEdit"
			class="flex-1"
			:select-roles="canSelectRoles"
			:deletion="canDeletion"
			:only-user="selectOnlyUser"
		/>
	</el-form-item>

	<el-form-item
		label="Исполнитель:"
		class="form__item"
		prop="executors"
	>
		<UserSearchV2
			v-model="formData.executors"
			:disabled="!canParticipantEdit"
			class="flex-1"
			:select-roles="canSelectRoles"
			:deletion="canDeletion"
			:only-user="selectOnlyUser"
			multiple
		/>
	</el-form-item>

	<el-form-item
		label="Контроллер:"
		class="form__item"
	>
		<UserSearchV2
			v-model="formData.controllers"
			:disabled="!canParticipantEdit"
			class="flex-1"
			:select-roles="canSelectRoles"
			:deletion="canDeletion"
			:only-user="selectOnlyUser"
			multiple
		/>
	</el-form-item>

	<el-form-item
		label="Наблюдатель:"
		class="form__item"
	>
		<UserSearchV2
			v-model="formData.observers"
			:disabled="!canParticipantEdit"
			class="flex-1"
			:select-roles="canSelectRoles"
			:deletion="canDeletion"
			:only-user="selectOnlyUser"
			multiple
		/>
	</el-form-item>
</template>

<script setup>

import { SelectDocumentTemplate } from "@/documents/common/features/select-document-template";
import { DOCUMENT_STATUS } from "@documents/directive/entities/directive/constants";
import { DOCUMENT_TYPE } from "@/documents/common/shared/constants";
import { UploadFile } from "@common/shared/ui";
import { computed } from "vue";
import dayjs from "dayjs";
import UserSearchV2 from "@/common/shared/ui/UserSearchV2.vue";
import UserLink from "@/common/shared/ui/UserLink.vue";
import { useUser } from "@/common/app/composables";
import { useDocument } from "@/documents/directive/entities/directive";

const { checkUserRights } = useUser();
const { checkDocumentStatus } = useDocument();

const props = defineProps({
	mode: String,
});

const formData = defineModel('formData', { type: Object });

/** Возможность редактирования участников на статусах "Подготовка" */
const canParticipantEdit = computed(() => [
	DOCUMENT_STATUS.PREPARATION,
].includes(formData.value.status_id));

/** Возможность выбирать роли только админу в момент создания документа */
const canSelectRoles = computed(() => props.mode === 'create' && checkUserRights('full_access'));

/** Возможность выставлять возможность удаления пользователя только админу */
const canDeletion = computed(() => checkUserRights('full_access'));

/** Возможность выбирать только пользователей в момент редактирования документа (когда документа создан в участниках НЕ МОГУТ БЫТЬ РОЛИ, а должны быть только пользователи) */
const selectOnlyUser = computed(() => props.mode === 'edit');

const handleChangeTemplate = (template) => {
	resetTemplate();

	formData.value.content = template.data.content;
	formData.value.author = template.data.author;
	formData.value.executors = template.data.executors;
	formData.value.controllers = template.data.controllers;
	formData.value.observers = template.data.observers;

	if (template.data.days_amount) {
		formData.value.executed_at = dayjs().add(template.data.days_amount, 'day').format('DD-MM-YYYY');
	} else {
		formData.value.executed_at = null;
	}
};

const resetTemplate = () => {
	formData.value.content = '';
	formData.value.author = null;
	formData.value.executors = [];
	formData.value.controllers = [];
	formData.value.observers = [];
	formData.value.executed_at = null;
};

</script>

<style scoped lang="scss">
.form {
	&__item {

		&::v-deep(.directive-date-picker) {
			width: 100%
		}

	}

	&__item.is-error ::v-deep(.el-upload-dragger) {
		border-color: red;
		border-style: solid;
	}
}

.line-height-normal {
	line-height: normal;
}
</style>