<template>
	<el-form-item
		prop="comment"
		:rules="rules.comment"
	>
		<el-input
			v-model="data.comment"
			type="textarea"
			placeholder="Комментарий"
			:rows="5"
		/>
	</el-form-item>
	<el-form-item prop="files" v-if="showFiles">
		<Upload
			block
			multiple
			v-model:file-list="data.files"
		/>
	</el-form-item>
</template>
<script setup>
import { computed, inject } from 'vue';
import Upload from '@/plugins/process/components/common/Upload.vue';

const data = inject('data');

const props = defineProps({
	action: Object,
	showFiles: {
		type: Boolean,
		default: true,
	}
});

const rules = computed(() => ({
	comment: {
		required: props.action.is_commentable,
		message: 'Заполните комментарий',
	},
}));
</script>