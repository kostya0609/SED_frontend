<template>
	<el-card
		shadow="never"
		class="participants"
	>
		<template #header>
			<div class="participants__header">
				<span>Участники</span>
				<span>Тип: {{ groupType.title.toLowerCase() }}</span>
			</div>
		</template>
		<Preloader :loading="loading">
			<el-table
				:data="participants"
				:show-header="false"
				table-layout="auto"
				scrollbar-always-on
				empty-text="Нет участников"
				class="participants__table"
			>
				<el-table-column
					prop="participant.user"
					width="300"
					v-slot="{ row }"
				>
					<UserLink
						:user="row.user"
						photoSize="small"
						v-if="row.type_id === 1"
					/>
					<RoleLink
						:role="row.static_role || row.dynamic_role"
						:type-role="row.type_id"
						:user-id="activeProcess.process.user_id"
						:api="{ getStaticUsers: StaticRoleRepo.getUsersByRoleId.bind(StaticRoleRepo), getDynamicUsers: DynamicRoleRepo.getUsersByRoleId.bind(DynamicRoleRepo) }"
						v-else
					/>
				</el-table-column>
				<el-table-column
					prop="_actions"
					align="right"
					v-slot="{ row }"
				>
					<el-button
						icon="Delete"
						type="danger"
						size="small"
						:disabled="!row.can_deletable"
						@click="onDelete(row)"
					/>
				</el-table-column>
			</el-table>
		</Preloader>
		<el-alert
			type="warning"
			show-icon
			class="participants__alert-max-count"
			:closable="false"
			:title="`Максимальное кол-во участников: ${maxParticipants}`"
			v-if="maxParticipants"
		/>
	</el-card>
</template>
<script setup>
import { Preloader, UserLink, RoleLink, useActiveProcess } from '@/plugins/process/common';
import { inject } from 'vue';

const { DynamicRoleRepo, StaticRoleRepo } = inject('useRepo');

const props = defineProps({
	participants: Array,
	maxParticipants: [Number, null],
	groupType: Object,
	loading: Boolean,
});


const { activeProcess } = useActiveProcess();
const emit = defineEmits(['delete']);

const onDelete = (participant) => {
	if (!participant.can_deletable) {
		throw new Error('Участника запрещено удалять!');
	}

	emit('delete', participant);
};
</script>
<style scoped lang="scss">
.participants {
	&__header {
		display: flex;
		justify-content: space-between;
		gap: .5rem;
	}

	&__alert-max-count {
		margin-top: 1rem;
	}
}
</style>