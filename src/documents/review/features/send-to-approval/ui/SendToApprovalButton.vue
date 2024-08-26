<template>
	<el-button
		:type="type"
		@click="handleClick"
	>
		<slot>
			Отправить на ознакомление
		</slot>
	</el-button>
</template>
<script setup>

import { ReviewRepo } from "@documents/review/entities/review/api";
import { inject } from "vue";

const processRef = inject('processRef');

const props = defineProps({
	type: {
		type: String,
		default: 'primary',
	},
	documentId: {
		type: Number,
	},
});

const handleClick = async () => {
	await ReviewRepo.sendToApproval(props.documentId);
	// TODO: Исправить косяк с обновлением процесса
	// processRef.value.updateProcess();
	location.reload();
};
</script>