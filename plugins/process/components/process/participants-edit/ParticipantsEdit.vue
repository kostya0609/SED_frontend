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
		<el-table
			:data="participants"
			:show-header="false"
		>
			<el-table-column prop="participant.user">
				<template #default="scope">
					<UserLink
						:user="scope.row.user"
						photoSize="small"
					/>
				</template>
			</el-table-column>
			<el-table-column
				prop="_actions"
				align="right"
			>
				<template #default="scope">
					<el-button
						icon="CloseBold"
						type="danger"
						size="small"
						:disabled="!scope.row.can_deletable"
						@click="onDelete(scope.row)"
					/>
				</template>
			</el-table-column>
		</el-table>
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
import UserLink from '@/plugins/process/components/common/UserLink.vue';
import { computed } from 'vue';

const props = defineProps({
	participants: Array,
	maxParticipants: [Number, null],
	groupType: Object,
});

const emit = defineEmits(['delete']);

const participants = computed(() => props.participants);

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