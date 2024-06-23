<template>
	<el-dialog
		v-model="dialogVisible"
		title="Ответ на комментарий"
	>
		<el-form
			:model="data"
			:rules="rules"
			ref="form"
			status-icon
		>
			<el-form-item
				required
				prop="answer"
			>
				<el-input
					placeholder="Введите ответ"
					type="textarea"
					:rows="5"
					v-model="data.answer"
				/>
			</el-form-item>
			<el-space
				alignment="end"
				direction="vertical"
				style="width: 100%;"
			>
				<el-button
					type="primary"
					@click="submitForm"
				>
					Отправить
				</el-button>
			</el-space>
		</el-form>
	</el-dialog>
</template>
<script setup>
import { computed, reactive, ref } from 'vue';
const props = defineProps({
	modelValue: Boolean,

});

const emit = defineEmits(['update:modelValue', 'change']);

const data = reactive({
	answer: '',
});

const form = ref();

const rules = reactive({
	answer: [
		{
			required: true,
			message: 'Введите ответ',
		}
	]
});

const dialogVisible = computed({
	get: () => props.modelValue,
	set: show => emit('update:modelValue', show),
});

const submitForm = async () => {
	await form.value.validate((isValid) => {
		if (!isValid) {
			return;
		}

		emit('change', { ...data });
	});
};
</script>