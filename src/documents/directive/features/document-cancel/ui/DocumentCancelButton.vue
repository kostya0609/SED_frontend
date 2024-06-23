<template>
	<el-button
		type="danger"
		@click="handleClick"
	>
		Аннулировать документ
	</el-button>
</template>
<script setup>
import { useDocument } from '@/documents/directive/entities/directive';
import { ElMessageBox } from 'element-plus';

const { cancel } = useDocument();

const props = defineProps({
	documentId: Number,
});

const handleClick = async () => {
	await ElMessageBox.confirm(`Вы уверены, что хотите аннулировать документ?`, {
		type: 'warning',
		callback: async (action) => {
			if (action === 'cancel') {
				return;
			}

			await cancel(props.documentId);
		},
	});
};
</script>