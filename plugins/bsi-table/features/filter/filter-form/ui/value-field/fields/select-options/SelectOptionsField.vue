<template>

	<el-select
		class="select-options"
		v-model="value"
		filterable
		remote
		collapse-tags
		collapse-tags-tooltip
		:reserve-keyword="false"

		multiple
		value-key="id"
		clearable
		placeholder="Выберите"
	>
		<el-option
			v-for="option in options"
			:key="option.id"
			:label="option.name"
			:value="option"
		/>
	</el-select>
</template>

<script setup>
// import { ref, watch } from 'vue';

// const departmentRepo = DepartmentRepo();
// const loading = ref(false);

defineProps({
	operator: Number,
	options: Array,
});

const value = defineModel();

// watch(value, (newValue) => {
// 	if (newValue) {
// 		newValue.forEach(user => {
// 			const exists = options.value.some(option => option.id === user.id);
// 			if (!exists) {
// 				options.value.push(user);
// 			}
// 		});
// 	}
// })

// const handleSearch = async (query) => {
// 	if (!query) return;
// 	loading.value = true;
// 	try {
// 		const departments = await departmentRepo.search({ query });
// 		options.value = departments?.data?.map((department) => ({
// 			id: department.id,
// 			name: department.name,
// 		}));
// 	} catch (error) {
// 		console.error('Ошибка при поиске пользователей:', error);
// 	} finally {
// 		loading.value = false;
// 	}
// };
</script>
<style scoped>
/* Для scoped стилей используйте deep-селектор */
:deep(.department-select .el-tooltip__popper) {
  max-width: 400px !important; /* Фиксированная ширина */
 
}

</style>