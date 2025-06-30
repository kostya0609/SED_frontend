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
		@participant-count-changed="onParticipantCountChanged"
		:approval-routes="approvalRoutes"
		v-slot:head
		v-bind="$attrs"
	>
		Принятие решения по документу "{{ document.number }}"
	</Process>
	<Participants
		class="approval-esz__participants"
		v-if="!hideParticipants"
	/>
</template>
<script setup>
import { useActiveTab, useDocument } from "@documents/esz/entities/esz";
import Participants from "./Participants.vue";

const emit = defineEmits(['participantCountChanged']);

const props = defineProps({
	approvalRoutes: Array,
	hideParticipants: {
		type: Boolean,
		default: false,
	}
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


/**
 * Обработка события: изменение количества участников в бизнес-процессе
 */
const onParticipantCountChanged = async (count) => {
	emit('participantCountChanged', count);
};
</script>
<style scoped lang="scss">
.approval-esz__participants {
	margin-top: 1.5rem;
}
</style>