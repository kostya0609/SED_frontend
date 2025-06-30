<template>
	<el-select
		class="select-user"
		placeholder="Выберите из списка"
		filterable
		clearable
		v-model="participantId"
		@change="handleChange"
	>
		<el-option
			v-for="participant in users"
			:key="participant.id"
			:label="(participant.user && participant.user.full_name) || (participant.static_role && participant.static_role.title) || (participant.dynamic_role && participant.dynamic_role.title)"
			:value="participant.id"
		/>
	</el-select>
</template>
<script setup>
import { ref } from 'vue';

const props = defineProps({
	users: Array,
});
const emit = defineEmits(['change']);

const participantId = ref(null);

const handleChange = () => {
	if (!participantId.value) return;

	const selectedUser = props.users.find(item => item.id === participantId.value);

	if (!selectedUser) {
		throw new Error(`Не удалось найти пользователя в списке по id ${participantId}`);
	}

	emit('change', selectedUser);
};
</script>
<style scoped lang="scss">
.select-user {
	width: 100%;
}
</style>