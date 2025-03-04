<template>
	<div class="requirements">
		<Ckeditor
			v-model="documentTemplate.requirements"
			:editor="ClassicEditor"
			:config="config"
		/>
		<el-button
			@click="save"
			type="primary"
			class="mt-3"
		>
			Сохранить
		</el-button>
	</div>
</template>

<script setup>
import 'ckeditor5/ckeditor5.css';
import { Ckeditor } from '@ckeditor/ckeditor5-vue';
import { useDocumentTemplate } from '@document-routes/document-template/entities/document-template';
import { ClassicEditor } from 'ckeditor5';
import { config } from './ckeditor-config';
import { useMagicKeys } from '@vueuse/core';

const { updateRequirements } = useDocumentTemplate();

const documentTemplate = defineModel({ required: true, type: Object });

const save = async () => {
	await updateRequirements(documentTemplate.value.id, documentTemplate.value.requirements);
};

useMagicKeys({
	passive: false,
	async onEventFired(e) {
		if (e.ctrlKey && (e.key === 's' || e.key === 'ы') && e.type === 'keydown') {
			e.preventDefault();
			await save();
		}
	},
});
</script>
<style>
.requirements .ck-content {
	min-height: 50vh;
}
</style>