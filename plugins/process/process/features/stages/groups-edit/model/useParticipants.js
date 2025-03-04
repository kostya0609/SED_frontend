import { inject, ref } from 'vue';
import { notify, useActiveProcess } from '@/plugins/process/common';

export const useParticipants = (initialParticipants = []) => {
	const { PreparationParticipantRepo } = inject('useRepo');
	const emit = inject('emit');

	const { activeProcess, getCountParticipants } = useActiveProcess();

	const participants = ref(initialParticipants);
	const loading = ref(false);

	const _fillParticipants = (participants, groupId) => {
		activeProcess.value.process.stages.forEach(stage => {
			stage.groups.forEach(groupStage => {
				if (groupStage.id === groupId) {
					groupStage.preparation_participants = participants;
				}
			});
		});
	};

	const attachParticipant = async (item, group) => {
		if (participants.value.find(participant => participant.id === item.id)) {
			notify.error('Ошибка добавления участника!', `${item.title} уже есть в списке!`);
			return;
		}

		if (group.max_participants && participants.value.length >= group.max_participants) {
			notify.error('Ошибка добавления участников!', `Вы добавили максимальное количество участников!`);
			return;
		}

		try {
			loading.value = true;
			const result = await PreparationParticipantRepo.attach({
				process_id: activeProcess.value.process.id,
				group_id: group.id,
				id: item.id,
				type_id: item.type_id,
				title: item.title,
				user_id: item.user && item.user.id,
				static_role_id: item.static_role && item.static_role.id,
				dynamic_role_id: item.dynamic_role && item.dynamic_role.id,
				can_deletable: item.can_deletable,
			});

			participants.value.push(result);

			_fillParticipants(participants.value, group.id);

			emit('participantCountChanged', getCountParticipants());
		} catch (e) {
			notify.fetchError(e.message);
			throw e;
		} finally {
			loading.value = false;
		}
	};

	const detachParticipant = async (item, group) => {
		try {
			loading.value = true;
			await PreparationParticipantRepo.detach({
				process_id: activeProcess.value.process.id,
				group_id: group.id,
				id: item.id,
			});
			participants.value = participants.value.filter(participant => participant.id !== item.id);

			_fillParticipants(participants.value, group.id);

			emit('participantCountChanged', getCountParticipants());
		} catch (e) {
			notify.fetchError(e.message);
			throw e;
		} finally {
			loading.value = false;
		}
	};

	return {
		participants,
		attachParticipant,
		detachParticipant,
		loading,
	};
};