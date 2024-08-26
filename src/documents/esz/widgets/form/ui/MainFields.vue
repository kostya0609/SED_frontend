<template>

	<el-form-item
		label="Элемент"
		class="form__item"
	>
		<b class="header_h3">ЭСЗ</b>
	</el-form-item>

	<el-form-item
		label="Тема документа"
		class="form__item"
		prop="theme"
	>
		<SearchTheme
			v-model="formData.theme"
			:options="defaultValues.themes"
			:disabled="!canThemeEdit"
		/>
	</el-form-item>


	<el-form-item
		label="Содержание документа"
		class="form__item"
		prop="content"
	>
		<el-input
			v-model="formData.content"
			type="textarea"
			:rows="5"
			placeholder="Содержание документа"
		/>
	</el-form-item>

	<h3 class="header_h3">Участники процесса</h3>

	<el-form-item
		label="Инициатор:"
		class="form__item"
		prop="initiator"
	>
		<SearchUserExtra
			v-model="formData.initiator"
			disabled
		/>
	</el-form-item>

	<el-form-item
		label="Подписант:"
		class="form__item"
		prop="signatory"
	>
		<SearchUserExtra
			v-model="formData.signatory"
			:disabled="!canParticipantEdit"
		/>
	</el-form-item>

	<el-form-item
		label="Адресат:"
		class="form__item"
		prop="receivers"
	>
		<SearchUserExtra
			v-model="formData.receivers"
			multiple
			:disabled="!canParticipantEdit"
		/>
	</el-form-item>

	<el-form-item
		label="Наблюдатель:"
		class="form__item"
	>
		<SearchUserExtra
			v-model="formData.observers"
			multiple
			:disabled="!canParticipantEdit"
		/>
	</el-form-item>
</template>

<script setup>

import { SearchTheme, SearchUserExtra } from "@common/shared/ui";
import { DOCUMENT_STATUS } from "@documents/esz/entities/esz/constants";
import { computed } from "vue";

const props = defineProps({
	formData: Object,
	defaultValues: Object,
});

const canParticipantEdit = computed(() => [
	DOCUMENT_STATUS.PREPARATION,
	DOCUMENT_STATUS.FIX,
].includes(props.formData.status_id));

const canThemeEdit = computed(() => [
	DOCUMENT_STATUS.PREPARATION,
	DOCUMENT_STATUS.FIX,
].includes(props.formData.status_id));


</script>