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
			label="Решение"
		>
			<template #default="{ row }">
				{{ row.event }}
			</template>

		</el-table-column>
		<el-table-column
			prop="comment"
			label="Комментарий"
		>
			<template #default="{ row }">
				{{ row.comment }}
			</template>

		</el-table-column>
		<el-table-column
			prop="files"
			label="Файлы"
		>
			<template #default="scope">
				<ul
					v-if="scope.row.files"
					class="file-list"
				>
					<li
						v-for="file of scope.row.files"
						:key="file.id"
					>
						<el-link :href="getDownLoadLink(file.id)">{{ file.original_name }}</el-link>
					</li>
				</ul>
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
import { formatDateTime, getDownLoadLink } from '@/common/shared/utils';
import { UserLink } from '.';
</script>
<style lang="scss" scoped>
.file-list {
	margin: 0;
	padding: 0;
	list-style: none;
}
</style>