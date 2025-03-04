<template>
	<Preloader
		:loading="loading"
		class="running-process"
	>
		<ProcessHeader />
		<Statuses
			class="running-process__statuses"
			v-if="showStatuses"
		/>
		<Stages
			:stages="activeProcess.process.stages"
			mode="view"
		/>
		<div class="running-process__row">
			<div
				:span="8"
				class="running-process__col-actions"
			>
				<Action
					:actions="actions"
					@decide="onDecide"
					@decided-with-interaction="onDecideWithInteraction"
					class="running-process__actions"
					:supervisor-participants="supervisorParticipants"
					v-if="showAction"
				/>
			</div>
			<div class="running-process__col-buttons">
				<div class="running-process__action-buttons">
					<CancellationProcessButton v-if="access.full || access.execute" />
				</div>
			</div>
		</div>
	</Preloader>
</template>
<script setup>
import { computed, inject, ref, watchEffect } from 'vue';
import { Stages } from '@/plugins/process/process/features/stages';
import { Action } from '@/plugins/process/process/features/action';
import { Statuses } from '@/plugins/process/process/features/statuses';
import { ProcessHeader } from '@/plugins/process/process/features/process-header';
import { CancellationProcessButton } from '@/plugins/process/process/features/process';
import { PARTICIPANT_TYPE, Preloader, notify, useActiveProcess, useProcessProvider } from '@/plugins/process/common';
import { useProcessSettings } from '@/plugins/process/process/components';

const { activeProcess } = useActiveProcess();
const { userId, executorId } = useProcessProvider();
const { showStatuses } = useProcessSettings();

const { ParticipantRepo } = inject('useRepo');
const emit = inject('emit');
const access = inject('access');

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
const supervisorParticipants = ref(null);

const checkPotentialSubuser = async () => {
	supervisorParticipants.value = await ParticipantRepo.checkPotentialSubuser({
		user_id: userId.value,
		process_id: activeProcess.value.process.id,
	});
};

watchEffect(async () => {
	const acts = getActiveStatus(activeProcess.value.process).stage.actions;
	const is_participant = participant.value;


	actions.value = acts.filter(action => {
		if (action.is_hidden) {
			return false;
		}

		if (supervisorParticipants.value && supervisorParticipants.value.participants.length > 0) {
			return true;
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


const loadParticipant = async () => {
	try {
		loading.value = true;
		participant.value = await ParticipantRepo.getActiveParticipant({
			process_id: activeProcess.value.process.id,
			user_id: userId.value,
		});
	} catch (e) {
		notify.fetchError(e.message);
		throw e;
	} finally {
		loading.value = false;
	}
};

const onDecide = async (_activeProcess, action) => {
	if (_activeProcess.isCreated()) {
		if (_activeProcess.process.isPreparation()) {
			emit('participantCancelled');
			emit('cancelled');
		} else {
			await loadParticipant();
			emit('decided', action);
			await checkPotentialSubuser();
		}

	} else if (_activeProcess.isCompleted()) {
		emit('completed');
		emit('decided', action);
	} else {
		emit('decided', action);
	}
};

const onDecideWithInteraction = (_activeProcess, action) => {
	emit('decidedWithInteraction', action);
};

await loadParticipant();
await checkPotentialSubuser();
</script>
<style scoped lang="scss">
.running-process {
	display: flex;
	flex-direction: column;
	gap: 1.25rem;

	&__action-buttons {
		display: flex;
		justify-content: flex-end;
	}

	&__actions {
		margin-left: 28px;
	}

	&__row {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
	}

	&__col-actions {
		flex: 1 0 300px;
		max-width: 500px;
		padding-left: 40px;
	}

	&__col-buttons {
		flex: 1;
	}
}
</style>