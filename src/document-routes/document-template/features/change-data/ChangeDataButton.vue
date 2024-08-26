<template>
	<el-button
		:type="type"
		@click="handleClick"
	>
		<slot>
			Изменить данные
		</slot>
	</el-button>
</template>
<script setup>
import { useRouter } from 'vue-router';

import { useDocumentTemplate } from "@document-routes/document-template/entities/document-template";
import { createDocumentTemplateLink } from '@document-routes/document-template/entities/document-template';

const router = useRouter();
const { documentTemplate } = useDocumentTemplate();
defineProps({
	type: {
		type: String,
		default: 'primary',
	}
});

const handleClick = () => {

	router.push(createDocumentTemplateLink(documentTemplate.value.type.id, 'edit', documentTemplate.value.id, null))
};
</script>

