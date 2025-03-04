<template>
	<el-button
		:type="type"
		@click="handleClick"
	>
		<slot>
			Отправить на исполнение
		</slot>
	</el-button>
</template>
<script setup>
import { useActiveTab } from "@documents/directive/entities/directive";
import { useDocument } from "@documents/directive/entities/directive";
import { useProcess } from "@/plugins/process";

defineProps({
	type: {
		type: String,
		default: 'primary',
	}
});

const { setActiveTab } = useActiveTab();
const { sendToApproval, document } = useDocument();
const { reloadProcess } = useProcess();

const handleClick = async () => {
	await sendToApproval(document.value.id);
	await reloadProcess();
	setActiveTab('process');
};
</script>