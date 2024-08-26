<template>
	<el-button
		type="danger"
		@click="handleClick"
	>
		<slot>
			Деактивировать маршрут
		</slot>
	</el-button>
</template>
<script setup>
import { useRouter } from 'vue-router';
import { ElMessageBox } from 'element-plus';
import { useDocumentRoute } from "@document-routes/document-route/entities/document-route";

const router = useRouter();
const { deactivate } = useDocumentRoute();

const props = defineProps({
	id: {
		type: Number,
		requared: true,
	}
});

const emit = defineEmits(['update']);

const handleClick = () => {
	ElMessageBox.confirm('Вы уверены, что хотите сделать маршрут Не активным?', {
		type: 'warning',
		callback: async (action) => {
			if (action !== 'confirm') {
				return;
			}

			await deactivate(props.id);
			emit('update')
		
		},
	});
};

</script>