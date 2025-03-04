<template>
	<div class="group">
		<el-row :gutter="24">
			<el-col
				:md="10"
				class="search-user-col"
			>
				<template v-if="group.type_fill_id === GROUP_TYPE_FILL.ANY_TYPE">
					<UserSearchV2
						hide-list
						:user-id="userId"
						select-roles
						@change="handleAddItem"
					/>
				</template>
			</el-col>
			<el-col :md="14">
				<Participants
					v-model:participants="group.preparation_participants"
					v-model:group="group"
					:max-participants="group.max_participants"
					:is-sortable="isSortable"
				/>
			</el-col>
		</el-row>
	</div>
</template>
<script setup>
import { inject } from 'vue';
import Participants from './Participants.vue';
import { notify } from '@/plugins/approval-routes/shared/utils';
import { UserSearchV2 } from '@/plugins/approval-routes/shared/ui';
import { GROUP_TYPE_FILL } from '@/plugins/approval-routes/shared/constants';
import { USER_ID_KEY } from '@/plugins/approval-routes/shared/symbols';

const userId = inject(USER_ID_KEY);

const group = defineModel('group');

const props = defineProps({
	isSortable: { type: Boolean, default: false }
});

const handleAddItem = (item) => {
	// TODO: Убрать данный код, когда будет передаватся "preparation_participants" в группе
	if (!group.value.preparation_participants) {
		group.value.preparation_participants = [];
	}

	if (group.value.preparation_participants.find(_item => _item.id === item.id)) {
		notify.error(`${item.title} уже есть в списке!`);
		return;
	}

	const { user, static_role, dynamic_role, ...attrs } = item;

	group.value.preparation_participants.push({
		...attrs,
		user,
		static_role,
		dynamic_role,
		user_id: user && user.id,
		static_role_id: static_role && static_role.id,
		dynamic_role_id: dynamic_role && dynamic_role.id,
		tmp_group_id: group.value.id,
		can_deletable: false,
		sort: (group.value.preparation_participants.length && group.value.preparation_participants[group.value.preparation_participants.length - 1].sort) + 1,
	});
};
</script>
<style scoped lang="scss">
.group {
	&__removed-participants {
		margin-top: 1rem;
	}
}

@media (max-width: 992px) {
	.search-user-col {
		margin-bottom: .5rem;
	}
}
</style>