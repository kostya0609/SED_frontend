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
import { createDocumentLink } from '@documents';
import { useDocument } from '@/documents/esz/entities/esz';

const router = useRouter();
const {document} = useDocument();

defineProps({
	type: {
		type: String,
		default: 'primary',
	}
});

const handleClick = () => {
	router.push(createDocumentLink(document.value.type.id, 'edit', document.value.id));
};
</script>