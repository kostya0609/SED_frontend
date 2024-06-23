<template>
	<div class="group">
		<el-table
			border
			:data="group.participants"
			style="width: 100%"
		>
			<el-table-column
				prop="id"
				label="ID участника"
				width="120"
				align="center"
				v-if="isDebug"
			/>
			<el-table-column
				prop="user.id"
				label="ID пользователя"
				width="150"
				align="center"
				v-if="isDebug"
			/>
			<el-table-column
				prop="user"
				label="ФИО"
			>
				<template #default="scope">
					<el-popover
						placement="top-start"
						content="Участник снят с бизнес-процесса"
						:width="300"
						trigger="hover"
						:disabled="scope.row.is_active"
					>
						<template #reference>
							<span class="group-fio">
								<span class="group-fio__user">
									<UserLink
										:user="scope.row.user"
										:disabled="!scope.row.is_active"
									/>
								</span>
								<ParticipantStatus
									v-if="scope.row.status"
									:status="scope.row.status"
									class="group-fio__reaction"
								/>
							</span>
						</template>
					</el-popover>
				</template>
			</el-table-column>
			<el-table-column
				prop="action"
				label="Решение"
			>
				<template #default="scope">
					<template v-if="scope.row.action">
						{{ scope.row.action.title }}
					</template>
				</template>
			</el-table-column>
			<el-table-column
				prop="comment"
				label="Комментарий"
			/>
			<el-table-column
				prop="files"
				label="Файлы"
			>
				<template #default="scope">
					<ul
						v-if="scope.row.files.length"
						class="group__files"
					>
						<li
							v-for="file of scope.row.files"
							:key="file.id"
						>
							<el-link :href="getDownloadLink(file.id)">{{ file.original_name }}</el-link>
						</li>
					</ul>
				</template>
			</el-table-column>
		</el-table>
		<div class="group__footer">
			<div class="group__type">Тип: {{ group.type.title.toLowerCase() }}</div>
			<div
				class="group__status-wrapper"
				v-if="isDebug"
			>
				<GroupStatus :status="group.status_id" />
			</div>
		</div>
	</div>
</template>
<script setup>
import UserLink from '@/plugins/process/components/common/UserLink.vue';
import { getDownloadLink } from '@/plugins/process/utils';
import ParticipantStatus from './ParticipantStatus.vue';
import GroupStatus from './GroupStatus.vue';
import { inject } from 'vue';

const isDebug = inject('isDebug');

defineProps({
	group: Object,
});
</script>
<style scoped lang="scss">
.group {
	&__type {
		margin-top: 1rem;
	}

	&__files {
		list-style: numeric;
		margin-left: 1rem;

		::v-deep(.el-link) {
			vertical-align: initial;
		}
	}

	&__footer {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
	}

	&__status-wrapper {
		flex: 1;
	}
}

.group-fio {
	display: flex;
	align-items: center;

	&__user {
		flex: 1;
	}

	&__reaction {}
}</style>