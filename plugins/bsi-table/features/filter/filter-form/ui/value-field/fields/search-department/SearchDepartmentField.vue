<template>
	<el-select
		class="department-select"
		v-model="value"
		filterable
		remote
		collapse-tags
		collapse-tags-tooltip
		:reserve-keyword="false"

		multiple
		value-key="id"
		clearable
		:remote-method="handleSearch"
		:loading="loading"
		placeholder="Поиск департамента"
	>
		<el-option
			v-for="user in options"
			:key="user.id"
			:label="user.name"
			:value="user"
		/>
	</el-select>
</template>

<script setup>
import { DepartmentRepo } from '../../../../../../../shared/api/index.js';
import { ref, watch } from 'vue';

const departmentRepo = DepartmentRepo();
const options = ref([]);
const loading = ref(false);

defineProps({
	operator: Number,
});

const value = defineModel();

watch(value, (newValue) => {
	if (newValue) {
		newValue.forEach(user => {
			const exists = options.value.some(option => option.id === user.id);
			if (!exists) {
				options.value.push(user);
			}
		});
	}
})

const handleSearch = async (query) => {
	if (!query) return;
	loading.value = true;
	try {
		const departments = await departmentRepo.search({ query });
		options.value = departments?.data?.map((department) => ({
			id: department.id,
			name: department.name,
		}));
	} catch (error) {
		console.error('Ошибка при поиске пользователей:', error);
	} finally {
		loading.value = false;
	}
};
</script>
<style scoped>
/* Для scoped стилей используйте deep-селектор */
:deep(.department-select .el-tooltip__popper) {
  max-width: 400px !important; /* Фиксированная ширина */
 
}

</style>