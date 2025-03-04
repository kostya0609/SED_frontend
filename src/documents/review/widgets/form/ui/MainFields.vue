<template>
	<el-form-item
		label="Элемент"
		class="form__item"
	>
		<div class="header_h3">
			Ознакомление
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
			:document-type="DOCUMENT_TYPE.REVIEW"
			v-if="mode !== 'edit'"
		/>
		<span
			class="line-height-normal"
			v-else
		>
			{{ formData.theme.theme_title }}
		</span>
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
		prop=portfolio
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
		label="Инициатор:"
		class="form__item"
		prop="initiator"
	>
		<UserLink :user="formData.initiator" />
	</el-form-item>

	<el-form-item
		label="Получающий ознакомление:"
		class="form__item"
		prop="receivers"
	>
		<UserSearchV2
			v-model="formData.receivers"
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
import { DOCUMENT_TYPE } from "@/documents/common/shared/constants";
import { UploadFile } from "@common/shared/ui";
import { DOCUMENT_STATUS } from "@documents/review/entities/review/constants";
import { computed } from "vue";

import UserSearchV2 from "@/common/shared/ui/UserSearchV2.vue";
import UserLink from "@/common/shared/ui/UserLink.vue";
import { useUser } from "@/common/app/composables";
import { useDocument } from "@/documents/review/entities/review";

const { checkDocumentStatus } = useDocument();
const { checkUserRights } = useUser();

const props = defineProps({
	mode: String,
});
const formData = defineModel('formData', { type: Object });

const canParticipantEdit = computed(() => [
	DOCUMENT_STATUS.PREPARATION,
].includes(formData.value.status_id));

const handleChangeTemplate = (template) => {
	resetTemplate();
	formData.value.content = template.data.content;
	formData.value.receivers = template.data.receivers;
};

const resetTemplate = () => {
	formData.value.content = '';
	formData.value.receivers = [];
};

/** Возможность выбирать роли только админу в момент создания документа */
const canSelectRoles = computed(() => props.mode === 'create' && checkUserRights('full_access'));

/** Возможность выставлять возможность удаления пользователя только админу */
const canDeletion = computed(() => checkUserRights('full_access'));

/** Возможность выбирать только пользователей в момент редактирования документа (когда документа создан в участниках НЕ МОГУТ БЫТЬ РОЛИ, а должны быть только пользователи) */
const selectOnlyUser = computed(() => props.mode === 'edit');

</script>
<style scoped lang="scss">
.form {
	&__item.is-error ::v-deep(.el-upload-dragger) {
		border-color: red;
		border-style: solid;
	}
}

.line-height-normal {
	line-height: normal;
}
</style>
