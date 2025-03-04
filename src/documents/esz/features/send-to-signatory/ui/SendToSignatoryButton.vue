<template>
	<el-button
		:type="type"
		@click="handleClick"
	>
		<slot>
			Отправить подписанту
		</slot>
	</el-button>
</template>
<script setup>
import { useProcess } from "@/plugins/process";
import { useActiveTab, useDocument } from "@documents/esz/entities/esz";
import { ElMessageBox } from "element-plus";

const props = defineProps({
	type: {
		type: String,
		default: 'primary',
	},
	documentId: {
		type: Number,
	},
});

const { sendToSignatory } = useDocument();
const { reloadProcess } = useProcess();
const { setActiveTab } = useActiveTab();

const handleClick = async () => {
	await ElMessageBox.confirm('Вы уверенны, что хотите отправить документ на подписание?', {
		type: 'warning',
		callback: async (action) => {
			if (action !== 'confirm') {
				return;
			}

			await sendToSignatory(props.documentId);
			await reloadProcess();
			setActiveTab('process');;
		},
	});
};
</script>