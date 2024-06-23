<template>
	<el-form-item
		prop="extra_fields.employee_id"
		:rules="rules.employee_id"
	>
		<SearchUser
			@change="handleChangeUser"
			v-model="data.extra_fields.employee_id"
		/>
	</el-form-item>
	<BaseAction :action="action" />
</template>
<script setup>
import { reactive, inject } from 'vue';
import SearchUser from '@/plugins/process/components/common/SearchUser.vue';
import BaseAction from '@/plugins/process/components/process/action/BaseAction.vue';

const data = inject('data');

defineProps({
	action: Object,
});

data.extra_fields = {
	employee_id: null,
};

const rules = reactive({
	employee_id: {
		required: true,
		message: 'Заполните сотрудника',
	},
});

const handleChangeUser = (user) => {
	data.extra_fields = {
		employee_id: user.id,
	};
};
</script>