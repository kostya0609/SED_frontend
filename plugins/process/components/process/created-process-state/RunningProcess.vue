<template>
	<Preloader :loading="loading">
		<Stages
			:stages="process.stages"
			mode="view"
		/>
		<el-row>
			<el-col :span="8">
				<Action
					:participant="participant"
					:actions="actions"
					@decide="onDecide"
					class="running-process__actions"
					v-if="showAction"
				/>
			</el-col>
			<el-col :span="16">
				<div class="running-process__action-buttons">
					<el-popconfirm
						title="Вы уверены, что хотите аннулировать бизнес-процесс?"
						@confirm="cancellation"
						width="200"
						v-if="access.full || access.execute"
					>
						<template #reference>
							<el-button type="primary">
								Аннулировать процесс
							</el-button>
						</template>
					</el-popconfirm>
				</div>
			</el-col>
		</el-row>
	</Preloader>
</template>
<script setup>
import { computed, inject, ref, watchEffect } from 'vue';
import { notify } from '@/plugins/process/utils';
import Preloader from '@/plugins/process/components/common/Preloader.vue';
import Stages from '@/plugins/process/components/process/stages/Stages.vue';
import Action from '@/plugins/process/components/process/action/Action.vue';
import { ACTIVE_PROCESS_TYPE, PROCESS_STATUS, PARTICIPANT_TYPE } from '@/plugins/process/constants';

const { ProcessRepo, ParticipantRepo } = inject('useRepo');
const userId = inject('userId');
const setActiveProcess = inject('setActiveProcess');
const access = inject('access');
const emit = inject('emit');
const activeProcess = inject('activeProcess');
const executorId = inject('executorId');

const props = defineProps({
	process: Object,
});

const getActiveStatus = (process) => {
	const activeStatusId = process.status.id;
	const status = process.statuses.find(status => status.current_status.id == activeStatusId);

	if (!status) {
		throw new Error('Не удалось найти активный статус!');
	}

	return status;
};

const loading = ref(false);
const participant = ref(null);
const actions = ref([]);
const showAction = computed(() => !!participant.value || actions.value.length > 0);

watchEffect(async () => {
	const acts = getActiveStatus(props.process).stage.actions;

	const is_participant = participant.value;

	actions.value = acts.filter(action => {
		if (action.is_hidden) {
			return false;
		}

		if (action.who_access_id === PARTICIPANT_TYPE.EXECUTOR) {
			return activeProcess.value ? activeProcess.value.process.user_id === userId.value : false;
		} else if (action.who_access_id === PARTICIPANT_TYPE.DOCUMENT_EXECUTOR) {
			return userId.value === executorId.value;
		} else if (action.who_access_id === PARTICIPANT_TYPE.PARTICIPANT) {
			return !!is_participant;
		} else {
			return false;
		}
	});
});

const cancellation = async () => {
	try {
		loading.value = true;
		const activeProcess = await ProcessRepo.cancellation({
			process_id: props.process.id,
			user_id: userId.value,
		});

		setActiveProcess(activeProcess);
		emit('executorCancelled');
		emit('cancelled');
	} catch (e) {
		notify.fetchError(e.message);
		throw e;
	} finally {
		loading.value = false;
	}
};

const loadParticipant = async () => {
	try {
		loading.value = true;
		participant.value = await ParticipantRepo.getActiveParticipant({
			process_id: props.process.id,
			user_id: userId.value,
		});
	} catch (e) {
		notify.fetchError(e.message);
		throw e;
	} finally {
		loading.value = false;
	}
};

const onDecide = async (process, action) => {
	if (process.type === ACTIVE_PROCESS_TYPE.CREATED) {
		if (process.process.status.id === PROCESS_STATUS.PREPARATION) {
			emit('participantCancelled');
			emit('cancelled');
		} else {
			await loadParticipant();
			emit('decided', action);
		}
	} else if (process.type === ACTIVE_PROCESS_TYPE.COMPLETED) {
		emit('completed');
	} else {
		emit('decided', action);
	}
};

await loadParticipant();
</script>
<style scoped lang="scss">
.running-process {
	&__action-buttons {
		display: flex;
		justify-content: flex-end;
	}

	&__actions {
		margin-left: 28px;
	}
}
</style>