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

import { useProcess } from "@/plugins/process";
import { useActiveTab, useDocument } from "@documents/review/entities/review";

const props = defineProps({
	type: {
		type: String,
		default: 'primary',
	},
	documentId: {
		type: Number,
	},
});

const { sendToApproval } = useDocument();
const { reloadProcess } = useProcess();
const { setActiveTab } = useActiveTab();

const handleClick = async () => {

	await sendToApproval(props.documentId);
	await reloadProcess();
	setActiveTab('process');

};
</script>