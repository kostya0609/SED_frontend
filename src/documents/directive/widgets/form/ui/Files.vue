<template>
	<h3 class="header_h3">Основные файлы</h3>
	<el-form-item
		class="form__item"
		prop="main"
	>
		<UploadFile
			v-model:file-list="formData.main"
			multiple
			style-v2
		/>
	</el-form-item>
</template>

<script setup>
import { UploadFile } from '@common/shared/ui';

defineProps({
	formData: Object,
	defaultValues: Object,
});

</script>

<style scoped lang="scss">
.form {
	&__item.is-error ::v-deep(.el-upload-dragger) {
		border-color: red;
		border-style: solid;
	}
}
</style>
