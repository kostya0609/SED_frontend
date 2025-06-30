<template>
	<DoubleConfirmPopover @confirm="removeParticipant">
		<template #reference>
			<el-button
				type="danger"
				:loading="loading"
			>
				Удалить
			</el-button>
		</template>
	</DoubleConfirmPopover>
</template>
<script setup>
import { inject, ref } from 'vue';
import { useActiveProcess, useProcessProvider, notify, DoubleConfirmPopover } from '@/plugins/process/common';

const { ParticipantRepo } = inject('useRepo');

const props = defineProps({
	participant: { type: Object },
});

const participants = defineModel('participants');

const { userId } = useProcessProvider();
const { activeProcess, } = useActiveProcess();

const loading = ref(false);

const removeParticipant = async () => {
	try {
		const participantId = props.participant.id;
		const processid = activeProcess.value.process.id;

		loading.value = true;

		await ParticipantRepo.deleteParticipant({
			participant_id: participantId,
			process_id: processid,
			user_id: userId.value,
		});

		participants.value = participants.value.filter(_participant => _participant !== props.participant);
	} catch (e) {
		notify.fetchError(e.message);
		throw e;
	} finally {
		loading.value = false;
	}
};
</script>