<template>
	<el-select
		class="select-user"
		placeholder="Выберите из списка"
		filterable
		clearable
		v-model="userId"
		@change="handleChange"
	>
		<el-option
			v-for="user in users"
			:key="user.id"
			:label="user.full_name"
			:value="user.id"
		/>
	</el-select>
</template>
<script setup>
import { ref } from 'vue';

const props = defineProps({
	users: Array,
});
const emit = defineEmits(['change']);

const userId = ref(null);

const handleChange = () => {
	if (!userId.value) return;

	const selectedUser = props.users.find(item => item.id === userId.value);

	if (!selectedUser) {
		throw new Error(`Не удалось найти пользователя в списке по id ${userId}`);
	}

	emit('change', selectedUser);
};
</script>
<style scoped lang="scss">
.select-user {
	width: 100%;
}
</style>