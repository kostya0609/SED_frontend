<template>
	<div :class="classNames">
		<div class="group__col-search">
			<template v-if="group.template_group.type_fill_id === GROUP_TYPE_FILL.ANY_TYPE">
				<UserSearchV2
					hide-list
					:user-id="activeProcess.process.user_id"
					:select-roles="access.selectRoles"
					@change="handleAddItem"
				/>
			</template>
			<template v-else-if="group.template_group.type_fill_id === GROUP_TYPE_FILL.FROM_LIST_TYPE">
				<SelectParticipantFromList
					:users="group.filled_participants"
					@change="addFilledParticipantV2"
					v-if="group.filled_participants.length"
				/>
				<SelectUserFromList
					:users="group.template_group.filled_participants"
					@change="addFilledParticipant"
					v-else-if="group.template_group.filled_participants"
				/>
				<el-alert
					type="warning"
					title="В списке нет участников для выбора!"
					v-else
				/>
			</template>
			<template v-else>
				<el-alert type="warning">Нереализованный тип заполнения группы!</el-alert>
			</template>
		</div>
		<div class="group__col-participants">
			<ParticipantsEdit
				:participants="participants"
				:group-type="group.type"
				:max-participants="group.template_group.max_participants"
				:loading="loading"
				@delete="participant => handleDetachParticipant(participant, group)"
			/>
		</div>
	</div>
</template>
<script setup>
import { computed, watch } from 'vue';
import ParticipantsEdit from './ParticipantsEdit.vue';
import SelectParticipantFromList from './SelectParticipantFromList.vue';
import SelectUserFromList from './SelectUserFromList.vue';
import { useParticipants } from '../model/useParticipants';
import { useProcessSettings } from '@/plugins/process/process/components';
import { GROUP_TYPE_FILL, UserSearchV2, useActiveProcess, useProcessProvider } from '@/plugins/process/common';

const props = defineProps({
	group: Object,
});

const { access } = useProcessProvider();
const { activeProcess } = useActiveProcess();
const { columnOnPreparation } = useProcessSettings();
const { participants, attachParticipant, detachParticipant, loading } = useParticipants(props.group.preparation_participants);

const classNames = computed(() => ({
	'group': true,
	'group--columns': columnOnPreparation.value,
}));

const handleAddItem = (item) => {
	attachParticipant({ ...item, can_deletable: true }, props.group);
};

const handleDetachParticipant = (participant, group) => {
	detachParticipant(participant, group);
};

const addFilledParticipant = (participant) => {
	attachParticipant({
		id: +`${participant.id}${1}`,
		type_id: 1,
		title: participant.full_name,
		can_deletable: true,
		user: { ...participant },
	}, props.group);
};

const addFilledParticipantV2 = (participant) => {
	attachParticipant(participant, props.group);
};

watch(() => props.group, group => {
	participants.value = group.preparation_participants;
});
</script>
<style scoped lang="scss">
.group {
	display: flex;
	flex-wrap: wrap;
	column-gap: 1.5rem;
	row-gap: .5rem;

	&--columns {
		flex-direction: column;
		flex-wrap: nowrap;
	}

	&__col-search {
		flex: 1;
	}

	&__col-participants {
		flex: 1;
	}
}
</style>