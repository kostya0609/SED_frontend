<template>
	<el-button
		type="danger"
		@click="handleClick"
	>
		<slot>
			Аннулировать документ
		</slot>
	</el-button>
</template>
<script setup>
import { ElMessageBox } from 'element-plus';
import { useDocument } from "@documents/review/entities/review";

const props = defineProps({
	document_id: {
		type: Number,
		requared: true,
	}
});

const { cancel } = useDocument();

const handleClick = async () => {
	await ElMessageBox.confirm(`Вы уверены, что хотите аннулировать документ?`, {
		type: 'warning',
		callback: async (action) => {
			if (action !== 'confirm') {
				return;
			}

			await cancel(props.document_id);
		},
	});
};
</script>