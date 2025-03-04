<template>
	<el-button
		:type="type"
		@click="handleClick"
	>
		<slot>
			<template v-if="checkDocumentStatus([DOCUMENT_STATUS.PREPARATION, DOCUMENT_STATUS.FIX])">
				Отправить на согласование
			</template>
			<template v-else-if="checkDocumentStatus(DOCUMENT_STATUS.FIX_SIGNING)">
				Отправить на подписание
			</template>
			<template v-else-if="checkDocumentStatus(DOCUMENT_STATUS.FIX_RESOLUTION)">
				Отправить на резолюцию
			</template>
			<template v-else>
				Отправить на согласование
			</template>
		</slot>
	</el-button>
</template>
<script setup>
import { useProcess } from "@/plugins/process";
import { useActiveTab, useDocument } from "@documents/esz/entities/esz";
import { DOCUMENT_STATUS } from "@documents/esz/entities/esz/constants";

const props = defineProps({
	type: {
		type: String,
		default: 'primary',
	},
	documentId: {
		type: Number,
	},
});

const { checkDocumentStatus, sendToApproval } = useDocument();
const { reloadProcess } = useProcess();
const { setActiveTab } = useActiveTab();

const handleClick = async () => {
	if (checkDocumentStatus([DOCUMENT_STATUS.PREPARATION, DOCUMENT_STATUS.FIX])) {
		setActiveTab('process');
	} else {
		await sendToApproval(props.documentId);
		await reloadProcess();
		setActiveTab('process');
	}
};
</script>