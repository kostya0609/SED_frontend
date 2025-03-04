<template>
	<el-space>
		<el-button
			:loading="loading"
			:icon="!isShowParticipantHistory ? 'View' : 'Hide'"
			@click="handleclick"
		>
			<template v-if="!isShowParticipantHistory">Запросить историю участников</template>
			<template v-else>Скрыть историю участников</template>
		</el-button>
		<el-button
			@click="getParticipantHistory"
			:loading="loading"
			icon="Refresh"
			title="Запросить историю участников"
			v-show="isShowParticipantHistory"
		/>
	</el-space>
	<UserTable
		class="user-table"
		:users="participantsInHistory"
		v-show="isShowParticipantHistory"
	/>
</template>
<script setup>
import { inject, ref } from 'vue';
import { useProcessProvider, UserTable } from '@/plugins/process/common';

const useRepo = inject('useRepo');

const { ParticipantRepo } = useRepo;
const { templateId, documentId } = useProcessProvider();

const participantsInHistory = ref([]);
const isShowParticipantHistory = ref(false);
const loading = ref(false);


const getParticipantHistory = async () => {
	try {
		loading.value = true;
		participantsInHistory.value = await ParticipantRepo.getParticipantHistory({
			template_id: templateId.value,
			document_id: documentId.value,
		});

		isShowParticipantHistory.value = true;
	} catch (e) {
		throw e;
	} finally {
		loading.value = false;
	}
};

const hideParticipantHistory = () => {
	isShowParticipantHistory.value = false;
};

const handleclick = () => {
	isShowParticipantHistory.value ? hideParticipantHistory() : getParticipantHistory();
};
</script>