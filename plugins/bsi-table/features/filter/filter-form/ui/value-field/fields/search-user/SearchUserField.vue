<template>
	<el-select
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
		placeholder="Поиск пользователей"
		style="width: 300px"
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
import { UserRepo } from '../../../../../../../shared/api/index.js';
import { ref, watch } from 'vue';

const userRepo = UserRepo();
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
		const users = await userRepo.search({ query });
		options.value = users?.data?.map((user) => ({
			id: user.id,
			name: user.full_name,
		}));
	} catch (error) {
		console.error('Ошибка при поиске пользователей:', error);
	} finally {
		loading.value = false;
	}
};
</script>