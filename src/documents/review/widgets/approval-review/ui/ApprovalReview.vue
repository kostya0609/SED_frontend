<template>
	<Process
		@created="onCreated"
		@deleted="onDeleted"
		@runned="onRunned"
		@decided="onDecided"
		@completed="onCompleted"
		@executor-cancelled="onExecutorCancelled"
		@participant-cancelled="onParticipantCancelled"
		@decided-with-interaction="onDecidedWithInteraction"
		:approval-routes="approvalRoutes"
		v-slot:head
	>
		Принятие решения по документу "{{ document.number }}"
	</Process>
</template>

<script setup>

import { useActiveTab, useDocument } from "@documents/review/entities/review";

defineProps({
	approvalRoutes: Array,
});

const { setActiveTab } = useActiveTab();
const { updateDocument, document } = useDocument();


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
const onDecided = async () => {
	await updateDocument();
};

/**
 * Обработка события: принято решение в бизнес-процессе, в котором активно взаимодействие
 */
 const onDecidedWithInteraction = async () => {
	setActiveTab('interaction');
};

/**
 * Обработка события: бизнес-процесс выполнен
 */
const onCompleted = async () => {
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