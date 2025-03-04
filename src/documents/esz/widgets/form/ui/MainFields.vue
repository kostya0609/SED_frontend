<template>
	<div>
		<el-form-item
			label="Элемент"
			class="form__item"
		>
			<div class="header_h3">
				ЭСЗ
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
				:document-type="DOCUMENT_TYPE.ESZ"
				force-disabled
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
				multiple
				v-model:file-list="formData.main"
				style-v2
			/>
		</el-form-item>
		<el-form-item
			class="form__item"
			prop="additional"
			label="Дополнительные файлы"
		>
			<UploadFile
				multiple
				v-model:file-list="formData.additional"
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
			label="Инициатор:"
			class="form__item"
			prop="initiator"
		>
			<UserLink :user="formData.initiator" />
		</el-form-item>

		<el-form-item
			label="Подписант:"
			class="form__item"
			prop="signatory"
		>
			<UserSearchV2
				v-model="formData.signatory"
				:disabled="!canParticipantEdit"
				class="flex-1"
				:select-roles="canSelectRoles"
				:deletion="canDeletion"
				:only-user="selectOnlyUser"
			/>
		</el-form-item>

		<el-form-item
			label="Адресат:"
			class="form__item"
			prop="receivers"
		>
			<UserSearchV2
				v-model="formData.receivers"
				multiple
				:disabled="!canParticipantEdit"
				class="flex-1"
				:select-roles="canSelectRoles"
				:deletion="canDeletion"
				:only-user="selectOnlyUser"
			/>
		</el-form-item>

		<el-form-item
			label="Наблюдатель:"
			class="form__item"
		>
			<UserSearchV2
				v-model="formData.observers"
				multiple
				:disabled="!canParticipantEdit"
				class="flex-1"
				:select-roles="canSelectRoles"
				:deletion="canDeletion"
				:only-user="selectOnlyUser"
			/>
		</el-form-item>
	</div>
</template>

<script setup>
import { SelectDocumentTemplate } from "@/documents/common/features/select-document-template";
import { DOCUMENT_TYPE } from "@/documents/common/shared/constants";
import { UploadFile, UserSearchV2 } from "@common/shared/ui";
import { DOCUMENT_STATUS } from "@documents/esz/entities/esz/constants";
import { computed } from "vue";
import { useUser } from "@/common/app/composables";
import UserLink from "@/common/shared/ui/UserLink.vue";
import { useDocument } from "@/documents/esz/entities/esz";

const props = defineProps({
	mode: String,
});

const { checkUserRights } = useUser();
const { checkDocumentStatus } = useDocument();

const formData = defineModel('formData', { type: Object });

/** Возможность редактирования участников на статусах "Подготовка" и "Устранение замечаний" */
const canParticipantEdit = computed(() => [
	DOCUMENT_STATUS.PREPARATION,
	DOCUMENT_STATUS.FIX,
	DOCUMENT_STATUS.DRAFT,
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
	formData.value.signatory = template.data.signatory;
	formData.value.receivers = template.data.receivers;
	formData.value.observers = template.data.observers;
};

const resetTemplate = () => {
	formData.value.content = '';
	formData.value.signatory = null;
	formData.value.receivers = [];
	formData.value.observers = [];
};
</script>
<style lang="scss" scoped>
.line-height-normal {
	line-height: normal;
}

.form {
	&__item.is-error ::v-deep(.el-upload-dragger) {
		border-color: red;
		border-style: solid;
	}
}
</style>