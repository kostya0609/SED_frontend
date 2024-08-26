<template>
	<el-button
		type="danger"
		@click="handleClick"
	>
		<slot>
			Удалить маршрут
		</slot>
	</el-button>
</template>
<script setup>
import { useRouter } from 'vue-router';
import { ElMessageBox } from 'element-plus';
import { useDocumentRoute } from "@document-routes/document-route/entities/document-route";

const router = useRouter();
const { remove } = useDocumentRoute();

const props = defineProps({
	id: {
		type: Number,
		requared: true,
	}
});

const handleClick = () => {
	ElMessageBox.confirm('Вы уверены, что хотите удалить маршрут?', {
		type: 'warning',
		callback: async (action) => {
			if (action !== 'confirm') {
				return;
			}

			await remove(props.id);
			router.replace('/sed/admin/document-routes/list');
		},
	});
};

</script>