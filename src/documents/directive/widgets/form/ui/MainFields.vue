<template>
	<el-form-item
		label="Элемент"
		class="form__item"
	>
		<b class="header_h3">Поручение</b>
	</el-form-item>

	<el-form-item
		label="Тема документа"
		class="form__item"
		prop="theme"
	>
		<SearchTheme
			v-model="formData.theme"
			:options="defaultValues.themes"
		/>
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
			:rows="5"
			placeholder="Содержание документа"
		/>
	</el-form-item>

	<h3 class="header_h3">Участники процесса</h3>

	<el-form-item
		label="Создатель:"
		class="form__item"
		prop="creator"
	>
		<SearchUser
			disabled
			v-model="formData.creator"
			:options="defaultValues.creator"
		/>
	</el-form-item>

	<el-form-item
		label="Автор:"
		class="form__item"
		prop="author"
	>
		<SearchUser
			v-model="formData.author"
			:options="defaultValues.author"
		/>
	</el-form-item>

	<el-form-item
		label="Исполнители:"
		class="form__item"
		prop="executors"
	>
		<SearchUser
			v-model="formData.executors"
			:options="defaultValues.executors"
			multiple
		/>
	</el-form-item>

	<el-form-item
		label="Контроллеры:"
		class="form__item"
	>
		<SearchUser
			v-model="formData.controllers"
			:options="defaultValues.controllers"
			multiple
		/>
	</el-form-item>

	<el-form-item
		label="Наблюдатели:"
		class="form__item"
	>
		<SearchUser
			v-model="formData.observers"
			:options="defaultValues.observers"
			multiple
		/>
	</el-form-item>

</template>

<script setup>

import { SearchUser, SearchTheme } from "@common/shared/ui";

defineProps({
	formData: Object,
	defaultValues: Object,
});

</script>

<style scoped lang="scss">
.form {
	&__item {

		&::v-deep(.directive-date-picker) {
			width: 100%
		}

	}
}
</style>