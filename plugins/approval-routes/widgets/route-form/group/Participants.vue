<template>
	<el-card
		shadow="never"
		class="participants"
	>
		<template #header>
			<div class="participants__header">
				<el-button
					icon="Sort"
					class="group-drag"
					size="small"
					:disabled="!isSortable"
				/>
				<span class="participants__head">
					Участники
					<template v-if="group.id"> группы №{{ group.id }}</template>
				</span>
				<el-select
					v-model="group.type_id"
					placeholder="Выбрать тип"
					class="participants__select-group"
				>
					<el-option
						v-for="item in groupTypes"
						:key="item.id"
						:label="item.title"
						:value="item.id"
					/>
				</el-select>
				<el-dropdown
					trigger="click"
					@command="handleCommand"
				>
					<el-button icon="MoreFilled" />
					<template #dropdown>
						<el-dropdown-menu>
							<el-dropdown-item
								icon="Delete"
								command="delete-group"
							>
								Удалить группу
							</el-dropdown-item>
						</el-dropdown-menu>

					</template>
				</el-dropdown>
			</div>
		</template>

		<el-table
			:data="participants"
			:show-header="false"
			table-layout="auto"
			scrollbar-always-on
		>
			<el-table-column v-slot="{ row }">
				<UserLink
					:user="row.user"
					photoSize="small"
					v-if="row.type_id === 1"
				/>
				<RoleLink
					:role="row.static_role || row.dynamic_role"
					:type-role="row.type_id"
					:user-id="userId"
					:api="{ getStaticUsers: StaticRoleRepo.getUsersByRoleId.bind(StaticRoleRepo), getDynamicUsers: DynamicRoleRepo.getUsersByRoleId.bind(DynamicRoleRepo) }"
					v-else
				/>
			</el-table-column>

			<el-table-column
				align="right"
				v-slot="{ row }"
			>
				<el-space>
					<el-tooltip
						effect="dark"
						content="Возможность удалить"
						placement="left-start"
					>
						<Switch v-model="row.can_deletable" />
					</el-tooltip>

					<el-button
						icon="CloseBold"
						type="danger"
						size="small"
						@click="detachUser(row)"
					/>
				</el-space>
			</el-table-column>

		</el-table>
	</el-card>
</template>
<script setup>
import { inject } from 'vue';
import { UserLink, Switch, RoleLink } from '@/plugins/approval-routes/shared/ui';
import { useStaticRoleRepo, useDynamicRoleRepo } from '@/plugins/approval-routes/shared/api';
import { USER_ID_KEY } from '@/plugins/approval-routes/shared/symbols';

const userId = inject(USER_ID_KEY);

const StaticRoleRepo = useStaticRoleRepo();
const DynamicRoleRepo = useDynamicRoleRepo();

const groupTypes = inject('groupTypes');
const stage = inject('stage');

const participants = defineModel('participants');
const group = defineModel('group');

const props = defineProps({
	isSortable: { type: Boolean, default: false }
});

const detachUser = async (item) => {
	participants.value = participants.value.filter(_item => _item.id !== item.id);
};

const handleCommand = (command) => {
	if (command === 'delete-group') {
		const index = stage.value.groups.findIndex(gr => gr === group.value);

		if (index !== -1) {
			stage.value.groups.splice(index, 1);
		}
	}
};
</script>
<style scoped lang="scss">
.participants {
	&__header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: .5rem;
	}

	&__head {
		flex: 1;
		margin-left: .5rem;
	}

	&__select-group {
		flex: 0 1 180px;
	}

	&__alert-max-count {
		margin-top: 1rem;
	}
}
</style>