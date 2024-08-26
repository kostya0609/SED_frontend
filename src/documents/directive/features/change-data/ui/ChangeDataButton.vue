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
import { useDocument } from '@documents/directive/entities/directive';

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