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
		<SearchUserExtra
			v-model="formData.creator"
			disabled
		/>
	</el-form-item>

	<el-form-item
		label="Автор:"
		class="form__item"
		prop="author"
	>
		<SearchUserExtra
			v-model="formData.author"			
		/>
	</el-form-item>

	<el-form-item
		label="Исполнитель:"
		class="form__item"
		prop="executors"
	>
		<SearchUserExtra
			v-model="formData.executors"
			multiple
		/>
	</el-form-item>

	<el-form-item
		label="Контроллер:"
		class="form__item"
	>
		<SearchUserExtra
			v-model="formData.controllers"
			multiple
		/>
	</el-form-item>

	<el-form-item
		label="Наблюдатель:"
		class="form__item"
	>
		<SearchUserExtra
			v-model="formData.observers"
			multiple
		/>
	</el-form-item>

</template>

<script setup>

import { SearchTheme, SearchUserExtra } from "@common/shared/ui";

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