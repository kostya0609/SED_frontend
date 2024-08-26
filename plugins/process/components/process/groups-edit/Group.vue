<template>
	<Preloader :loading="loading">
		<el-row :gutter="24">
			<el-col :span="12">
				<template v-if="group.type_fill_id === GROUP_TYPE_FILL.ANY_TYPE">
					<SearchUser
						block
						ref="refSearchUser"
						@change="attachParticipant"
					/>
				</template>
				<template v-else-if="group.type_fill_id === GROUP_TYPE_FILL.FROM_LIST_TYPE">
					<SelectUserFromList
						:users="group.filled_participants"
						@change="attachParticipant"
					/>
				</template>
				<template v-else>
					<el-alert type="warning">Нереализованный тип заполнения группы!</el-alert>
				</template>
			</el-col>
			<el-col :span="12">
				<ParticipantsEdit
					:participants="participants"
					:group-type="group.type"
					:max-participants="group.max_participants"
					@delete="detachParticipant"
				/>
			</el-col>
		</el-row>
	</Preloader>
</template>
<script setup>
import { notify } from '@/plugins/process/utils';
import { ref, inject, computed, watch } from 'vue';
import SelectUserFromList from './SelectUserFromList.vue';
import { GROUP_TYPE_FILL } from '@/plugins/process/constants';
import Preloader from '@/plugins/process/components/common/Preloader.vue';
import SearchUser from '@/plugins/process/components/common/SearchUser.vue';
import ParticipantsEdit from '@/plugins/process/components/process/participants-edit/ParticipantsEdit.vue';


const { ParticipantRepo } = inject('useRepo');
const processId = inject('processId');

const props = defineProps({
	group: Object,
});


const group = computed(() => props.group);
const participants = ref(props.group.participants);
const loading = ref(false);
const refSearchUser = ref();

const attachParticipant = async (user) => {
	refSearchUser.value && refSearchUser.value.resetUser();

	if (participants.value.find(item => item.user.id === user.id)) {
		notify.error(`${user.full_name} уже есть в списке участников!`);
		return;
	}

	if (group.value.max_participants && participants.value.length >= group.value.max_participants) {
		notify.error(`Вы добавили максимальное количество участников!`);
		return;
	}

	try {
		loading.value = true;
		const result = await ParticipantRepo.attach({
			process_id: processId.value,
			group_id: group.value.id,
			user_id: user.id,
		});

		participants.value.push(result);
	} catch (e) {
		notify.fetchError(e.message);
		throw e;
	} finally {
		loading.value = false;
	}
};

const detachParticipant = async (participant) => {
	try {
		loading.value = true;
		await ParticipantRepo.detach({
			process_id: processId.value,
			group_id: group.value.id,
			user_id: participant.user.id,
		});
		participants.value = participants.value.filter(item => item.id !== participant.id);
	} catch (e) {
		notify.fetchError(e.message);
		throw e;
	} finally {
		loading.value = false;
	}
};

watch(() => props.group.participants, (prts) => {
	participants.value = prts;
});
</script>
<style scoped lang="scss">
.group {
	&__removed-participants {
		margin-top: 1rem;
	}
}
</style>