<template>
	<el-table :data="tableData">
		<el-table-column
			prop="id"
			label="ID"
			sortable
			v-slot="{ row }"
			width="100"
		>
			<Copy>{{ row.id }}</Copy>
		</el-table-column>
		<el-table-column
			prop="_user"
			label="Пользователь"
		>
			<template #header>
				<el-input
					v-model="searchUserName"
					placeholder="Имя пользователя"
					clearable
				/>
			</template>
			<template #default="{ row }">
				<UserLink :user="row" />
			</template>
		</el-table-column>
	</el-table>
</template>
<script setup>
import { computed, ref } from 'vue';
import UserLink from './UserLink.vue';
import Copy from './Copy.vue';

const props = defineProps({
	users: {
		type: Array,
		default: [],
	},
});

const searchUserName = ref('');
const tableData = computed(() => props.users.filter(
	user =>
		!searchUserName.value ||
		user.full_name.toLowerCase().includes(searchUserName.value.toLowerCase()))
);
</script>