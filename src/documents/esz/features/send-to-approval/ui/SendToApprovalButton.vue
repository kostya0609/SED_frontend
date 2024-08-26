<template>
	<el-button
		:type="type"
		@click="handleClick"
	>
		<slot>
			Отправить на согласование
		</slot>
	</el-button>
</template>
<script setup>
import { ESZRepo } from "@documents/esz/entities/esz/api";
import { DOCUMENT_STATUS } from "@documents/esz/entities/esz/constants";
import { useActiveTab, useDocument } from "@documents/esz/entities/esz";
import { inject } from "vue";

const processRef = inject('processRef');

const { checkDocumentStatus } = useDocument();

const props = defineProps({
	type: {
		type: String,
		default: 'primary',
	},
	documentId: {
		type: Number,
	},
});

const { setActiveTab } = useActiveTab();

const handleClick = async () => {
	if (checkDocumentStatus([DOCUMENT_STATUS.PREPARATION, DOCUMENT_STATUS.FIX])) {
		setActiveTab('process');
	} else {
		await ESZRepo.sendToApproval(props.documentId);

		// TODO: Исправить косяк с обновлением процесса
		// processRef.value.updateProcess();

		location.reload();
	}
};
</script>