<template>
	<el-select
		v-model="users"
		class="select-user"
		placeholder="Выберите из списка"
		filterable
		clearable
		value-key="id"
	>
		<el-option
			v-for="user in usersList"
			:key="user.id"
			:label="user.full_name"
			:value="user"
		/>
	</el-select>
</template>
<script setup>

const users = defineModel('users');

const props = defineProps({
	usersList: Array,
});

</script>
<style scoped lang="scss">
.select-user {
	width: 100%;
}
</style>