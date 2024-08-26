<template>
	<el-button
		type="danger"
		@click="handleClick"
	>
		<slot>
			Деактивировать шаблон
		</slot>
	</el-button>
</template>
<script setup>
import { useRouter } from 'vue-router';
import { ElMessageBox } from 'element-plus';
import { useDocumentTemplate } from "@document-routes/document-template/entities/document-template";

const router = useRouter();
const { deactivate } = useDocumentTemplate();

const props = defineProps({
	id: {
		type: Number,
		requared: true,
	}
});

const emit = defineEmits(['update']);

const handleClick = () => {
	ElMessageBox.confirm('Вы уверены, что хотите сделать шаблон Не активным?', {
		type: 'warning',
		callback: async (action) => {
			if (action !== 'confirm') {
				return;
			}

			await deactivate(props.id);
			emit('update');
		},
	});
};

</script>