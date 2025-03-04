<template>
	<el-dialog
		v-model="visible"
		title="Аннулирование процесса"
	>
		<el-form
			:model="form"
			:rules="rules"
			label-position="top"
			ref="fromRef"
		>
			<el-form-item
				label="Комментарий"
				prop="comment"
			>
				<el-input
					v-model="form.comment"
					type="textarea"
					show-word-limit
					:rows="4"
				/>
			</el-form-item>
		</el-form>
		<template #footer>
			<el-button @click="visible = false">Отмена</el-button>
			<el-button
				type="danger"
				@click="handleSubmit"
			>
				Аннулировать
			</el-button>
		</template>
	</el-dialog>
</template>
<script setup>
import { reactive, ref } from 'vue';

const visible = defineModel('visible', { default: false });
const emit = defineEmits(['submit']);

const fromRef = ref();

const form = reactive({
	comment: '',
});
const rules = reactive({
	comment: [
		{
			required: true,
			message: 'Комментарий обязателен!',
		},
		{
			min: 3,
			message: 'Комментарий должен быть от 3 символов!',
		},
		{
			max: 65535,
			message: 'Комментарий не должен превышать 65 535 символов!',
		}
	]
});

const handleSubmit = () => {
	fromRef.value.validate((isValid) => {
		if (!isValid) {
			return;
		}

		visible.value = false;
		emit('submit', form);
	});
};
</script>