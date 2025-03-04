<template>
	<CloseTechnicalWork>
		<ActiveProcess v-bind="$attrs" />
	</CloseTechnicalWork>
</template>
<script setup>
import { provide, useSlots, watch } from 'vue';
import { ActiveProcess } from '@/plugins/process/process/widgets/active-process';
import { useApprovalRoute } from '@/plugins/process/process/features/select-approval-route';
import { useProcessSettings } from './useProcessSettings';
import { CloseTechnicalWork } from '@/plugins/process/common/features/settings/close-technical-work';

const slots = useSlots();

const { approvalRoutes } = useApprovalRoute();
const { initSettings } = useProcessSettings();

const props = defineProps({
	approvalRoutes: {
		type: Array,
		default: [],
	},
	showStatuses: {
		type: Boolean,
		default: true,
	},
	showButtonsOnPreparation: {
		type: Boolean,
		default: true,
	},
	columnOnPreparation: {
		type: Boolean,
		default: false,
	},
	showHead: {
		type: Boolean,
		default: true,
	},
});

watch(() => props.approvalRoutes, (routes) => {
	approvalRoutes.value = routes;
}, { immediate: true });

watch([
	() => props.showStatuses,
	() => props.showButtonsOnPreparation,
	() => props.columnOnPreparation,
	() => props.showHead,
], ([
	showStatuses,
	showButtonsOnPreparation,
	columnOnPreparation,
	showHead,
]) => {
	initSettings({
		showStatuses,
		showButtonsOnPreparation,
		columnOnPreparation,
		showHead,
	});
}, { immediate: true });

provide('slots', slots);
</script>