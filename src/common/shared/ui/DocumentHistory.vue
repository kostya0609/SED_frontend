<template>
	<el-table :data="history">
		<el-table-column
			prop="created_at"
			label="Дата"
			sortable
		>
			<template #default="{ row }">
				{{ formatDateTime(row.created_at) }}
			</template>
		</el-table-column>
		<el-table-column
			prop="event"
			label="Событие"
		>
			<template #default="{ row }">
				{{ row.event }}
			</template>

		</el-table-column>
		<el-table-column
			prop="user.user"
			width="350"
		>
			<template #default="{ row }">
				<UserLink :user="row.user" />
			</template>
		</el-table-column>

	</el-table>
</template>
<script setup>
defineProps({
	history: Array,
});
import { formatDateTime } from '@/common/shared/utils';
import { UserLink } from '.';
</script>