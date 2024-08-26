<template>
	<Process
		@created="onCreated"
		@deleted="onDeleted"
		@runned="onRunned"
		@decided="onDecided"
		@completed="onCompleted"
		@executorCancelled="onExecutorCancelled"
		@participantCancelled="onParticipantCancelled"
		v-slot:head="{ process }"
	>
		{{ process.title }}
	</Process>
</template>

<script setup>
import { ref, inject } from 'vue';
import { TEMPLATE_ACTION } from "@/plugins/process/constants";
import { useActiveTab, useDocument } from "@documents/directive/entities/directive";

defineProps({
	document: Object,
});

const { setActiveTab } = useActiveTab();
const { updateDocument } = useDocument();

const interactionRef = inject('interactionRef');
const processRef = inject('processRef');


/**
 * Обработка события: бизнес-процесс создан
 */
const onCreated = async () => {
	await updateDocument();
};

/**
 * Обработка события: бизнес-процесс был удален
 */
const onDeleted = async () => {
	await updateDocument();
};

/**
 * Обработка события: бизнес-процесс запущен
 */
const onRunned = async () => {
	await updateDocument();
};

/**
 * Обработка события: принято решение в бизнес-процессе
 */
const onDecided = async (action) => {
	await updateDocument();

	if (action.template_action_id === TEMPLATE_ACTION.MAKE_COMMENT_AND_NOTIFY_EXECUTOR ||
		action.template_action_id === TEMPLATE_ACTION.MAKE_COMMENT_AND_NOTIFY_EXECUTOR_DOCUMENT) {

		setActiveTab('interaction');
		setTimeout(async () => {
			await interactionRef.value.updateComments();
		}, 100);
	}
};

/**
 * Обработка события: бизнес-процесс выполнен
 */
const onCompleted = async () => {
	await updateDocument();
};

/**
 * Обработка события: Аннулирование бизнес-процесса
 */
const onExecutorCancelled = async () => {
	await updateDocument();
};

/**
 * Обработка события: Отрицательном решении бизнес-процесса
 */
const onParticipantCancelled = async () => {
	await updateDocument();
};
</script>

<style scoped></style>