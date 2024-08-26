<template>
	<el-button
		type="danger"
		@click="handleClick"
	>
		<slot>
			Удалить документ
		</slot>
	</el-button>
</template>
<script setup>
import { useRouter } from 'vue-router';
import { ElMessageBox } from 'element-plus';
import { useDocument } from "@documents/review/entities/review";

const router = useRouter();
const { remove } = useDocument();

const props = defineProps({
	document_id: {
		type: Number,
		requared: true,
	}
});

const handleClick = () => {
	ElMessageBox.confirm('Вы уверены, что хотите удалить документ?', {
		type: 'warning',
		callback: async (action) => {
			if (action !== 'confirm') {
				return;
			}

			await remove(props.document_id);
			router.replace('/sed');
		},
	});
};

</script>