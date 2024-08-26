<template>
	<el-button
		type="danger"
		@click="handleClick"
	>
		Удалить документ
	</el-button>
</template>
<script setup>
import { useRouter } from 'vue-router';
import { ElMessageBox } from 'element-plus';
import { useDocument } from "@documents/directive/entities/directive";

const router = useRouter();
const { remove } = useDocument();

const props = defineProps({
	documentId: Number,
});

const handleClick = () => {
	ElMessageBox.confirm('Вы уверены, что хотите удалить документ?', {
		type: 'warning',
		callback: async (action) => {
			if (action !== 'confirm') {
				return;
			}

			await remove(props.documentId);
			router.replace('/sed');
		},
	});
};
</script>