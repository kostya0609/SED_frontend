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

import { useDocumentRoute } from "@document-routes/document-route/entities/document-route";

const router = useRouter();
const { documentRoute } = useDocumentRoute();
defineProps({
	type: {
		type: String,
		default: 'primary',
	}
});

const handleClick = () => {
	router.push({name: 'editDocumentRoutePage', params: {id: documentRoute.id} });
};
</script>