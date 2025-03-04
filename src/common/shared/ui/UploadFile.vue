<template>
	<el-upload
		ref="upload"
		:class="classNames"
		:auto-upload="autoUpload"
		drag
		@exceed="handleExceed"
		@preview="download"
	>
		<el-icon class="el-icon--upload">
			<upload-filled />
		</el-icon>
		<div class="el-upload__text">
			Перенесите файл в эту область или нажмите на иконку <em>загрузки</em>
		</div>

		<template #file="{ file }">
			<slot
				name="file"
				:file="file"
			/>
		</template>
	</el-upload>


</template>
<script setup>
import { genFileId } from 'element-plus';
import { ref, defineExpose, computed } from 'vue';

const props = defineProps({
	autoUpload: {
		type: Boolean,
		default: false,
	},
	styleV2: {
		type: Boolean,
		default: false,
	}
});

const emit = defineEmits([
	'exceed', 'preview'
])

const classNames = computed(() => ({
	'upload': true,
	'upload-v2': props.styleV2,

}));

const upload = ref();

const handleExceed = (files, uploadFiles) => {
	upload.value.clearFiles();
	const file = files[0];
	file.uid = genFileId();
	upload.value.handleStart(file);
	props.autoUpload && upload.value.submit();
	emit('exceed', files, uploadFiles);
};

const download = (file) => {
	const link = document.createElement('a');
	link.href = file.url;
	link.download = file.name;
	link.click();
	emit('preview', file);
};

defineExpose({
	ref: upload,
});
</script>

<style lang="scss" scoped>
.upload {
	width: 100%;
	line-height: 1.3;
}

.upload-v2 {
	&:deep(.el-upload-dragger) {
		padding: 0 1rem;
		display: flex;
		flex-direction: row-reverse;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
	}

	&:deep(.el-upload-dragger.el-upload-dragger .el-icon--upload) {
		font-size: 25px;
		margin-bottom: 0;
		line-height: normal;
	}
}
</style>
