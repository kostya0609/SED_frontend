<template>
	<div class="group">
		<el-table
			border
			:data="group.participants"
			style="width: 100%"
			table-layout="auto"
		>
			<el-table-column
				prop="id"
				label="ID участника"
				width="120"
				align="center"
				v-if="isDebug"
				v-slot="{ row }"
			>
				<Copy>{{ row.id }}</Copy>
			</el-table-column>
			<el-table-column
				prop="user.id"
				label="ID пользователя"
				width="150"
				align="center"
				v-if="isDebug"
				v-slot="{ row }"
			>
				<Copy>{{ row.user.id }}</Copy>
			</el-table-column>
			<el-table-column
				prop="user"
				label="ФИО"
				width="500"
			>
				<template #default="scope">
					<el-popover
						placement="top-start"
						content="Участник снят с бизнес-процесса"
						:width="500"
						trigger="hover"
						:disabled="scope.row.is_active"
					>
						<template #reference>
							<div class="group-fio">
								<div class="group-fio__wrapper">
									<div
										v-if="scope.row.subuser"
										class="group-fio__subuser"
									>
										<UserLink
											:user="scope.row.subuser"
											:disabled="!scope.row.is_active"
										/>&nbsp;за
									</div>
									<UserLink
										:user="scope.row.user"
										:disabled="!scope.row.is_active"
										class="group-fio__user"
										:class="{ 'group-fio__user--with-subuser': !!scope.row.subuser }"
									/>
								</div>
								<ParticipantStatus
									v-if="scope.row.status"
									:status="scope.row.status"
									class="group-fio__reaction"
									@click="console.log({ ...scope.row })"
								/>
							</div>
						</template>
					</el-popover>
				</template>
			</el-table-column>
			<el-table-column
				prop="action"
				label="Решение"
				width="300"
			>
				<template #default="scope">
					<el-space>
						<template v-if="scope.row.action">
							{{ scope.row.action.title }}
						</template>
					</el-space>
				</template>
			</el-table-column>
			<el-table-column
				prop="comment"
				label="Комментарий"
				width="300"
			/>
			<el-table-column
				prop="files"
				label="Файлы"
				min-width="250"
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
							<el-link
								:underline="false"
								:href="getDownloadLink(file.id)"
							>
								{{ file.original_name }}
							</el-link>
						</li>
					</ul>
				</template>
			</el-table-column>
		</el-table>
		<div class="group__footer">
			<div
				class="group__id"
				v-if="isDebug"
			>
				ID: <Copy>{{ group.id }}</Copy>
			</div>
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
import GroupStatus from './GroupStatus.vue';
import ParticipantStatus from './ParticipantStatus.vue';
import { Copy, getDownloadLink, useProcessProvider, UserLink } from '@/plugins/process/common';

const { isDebug } = useProcessProvider();

defineProps({
	group: Object,
});
</script>
<style scoped lang="scss">
.group {

	&__type,
	&__id {
		margin-top: 1rem;
	}

	&__files {
		list-style: numeric;
		padding-left: 1rem;

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
	gap: .5rem;

	&__wrapper {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
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