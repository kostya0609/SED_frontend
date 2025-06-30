<template>
	<el-table
		border
		:data="users"
		style="width: 100%"
		table-layout="auto"
	>
		<el-table-column
			prop="user"
			label="ФИО"
			width="500"
			v-slot:default="{ row }"
		>
			<UserLink
				:user="row.user"
				v-if="row.user"
			/>
		</el-table-column>
		<el-table-column
			prop="action"
			label="Решение"
			width="300"
		/>
		<el-table-column
			prop="comment"
			label="Комментарий"
			width="300"
		/>
		<el-table-column
			prop="files"
			label="Файлы"
			min-width="250"
		/>
	</el-table>
</template>
<script setup>
import { UserLink } from '@common/shared/ui';

defineProps({
	users: {
		type: Array,
		required: true,
	},
});
</script>