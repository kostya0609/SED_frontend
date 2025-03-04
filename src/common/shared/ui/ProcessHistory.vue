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
			prop="process_template_name"
			label="Название процесса"
		>
			<template #default="{ row }">
				{{ row.process_template_name }}
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
			width="400"
		>
			<template #default="{ row }">
				<div class="process-history__user-wrapper">
					<div
						v-if="row.subuser"
						class="process-history__subuser"
					>
						<UserLink :user="row.subuser" />&nbsp;за
					</div>
					<UserLink
						:user="row.user"
						class="process-history__user"
						:class="{ 'process-history__user--with-subuser': !!row.subuser }"
					/>
				</div>
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

.process-history {
	&__user-wrapper {
		display: flex;
		flex-direction: column;
		gap: .25rem;
	}

	&__user {
		&--with-subuser {
			margin-left: 2rem;
		}
	}

	&__subuser {
		display: flex;
		align-items: center;
		font-style: italic;
	}
}
</style>