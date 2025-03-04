<template>
	<el-form-item
		prop="extra_fields.deadline"
		:rules="rules.deadline"
	>
		<el-date-picker
			v-model="data.extra_fields.deadline_timestamp"
			placeholder="Срок исполнения"
			type="date"
			value-format="x"
			class="request-change-deadline__date-picker"
		/>
	</el-form-item>
	<BaseAction :action="action" />
</template>
<script setup>
import BaseAction from './BaseAction.vue';
import { reactive, inject, watch } from 'vue';
import { SearchUser, formatDate } from '@/plugins/process/common';

const data = inject('data');

defineProps({
	action: Object,
});

data.extra_fields = {
	deadline_timestamp: null,
	deadline: null,
};

const rules = reactive({
	deadline: {
		required: true,
		message: 'Заполните срок исполнения',
	},
});

watch(() => data.extra_fields.deadline_timestamp, (deadlineTimestamp) => {
	data.extra_fields.deadline = formatDate(deadlineTimestamp);
});
</script>
<style scoped>
::v-deep(.request-change-deadline__date-picker) {
	flex: 1;
}
</style>