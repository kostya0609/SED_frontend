<template>
	<el-button
		type="danger"
		@click="handleClick"
	>
		<slot>
			Удалить шаблон документа
		</slot>
	</el-button>
</template>
<script setup>
import { useRouter } from 'vue-router';
import { ElMessageBox } from 'element-plus';
import { useDocumentTemplate } from "@document-routes/document-template/entities/document-template";

const router = useRouter();
const { remove, documentTemplate } = useDocumentTemplate();

const props = defineProps({
	id: {
		type: Number,
		requared: true,
	}
});

const handleClick = () => {
	ElMessageBox.confirm('Вы уверены, что хотите удалить шаблон документа?', {
		type: 'warning',
		callback: async (action) => {
			if (action !== 'confirm') {
				return;
			}

			await remove(props.id);
			router.replace(`/sed/admin/document-routes/detail/${documentTemplate.value.route_id}`);
		},
	});
};

</script>