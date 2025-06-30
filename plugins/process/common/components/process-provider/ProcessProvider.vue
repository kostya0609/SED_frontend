<template>
	<Preloader :loading="loading">
		<slot v-if="!loading" />
	</Preloader>
</template>
<script setup>
import { computed, provide, watch } from 'vue';
import { useProcessProvider } from './useProcessProvider';
import { useActiveProcess } from '@/plugins/process/common';
import { Preloader, useSetting } from '@/plugins/process/common';

const { initSettings } = useSetting();
const { initActiveProcess, loading } = useActiveProcess();
const { initProvider, documentId, templateId } = useProcessProvider();

const props = defineProps({
	templateId: Number,
	executorId: Number,
	userId: Number,
	access: {
		type: Object,
		default: {
			full: false,
			execute: true,
			selectRoles: false,
		}
	},
	moduleName: String,
	document: {
		type: Object,
		validator(document) {
			return !!document.id;
		},
	},
	isDebug: {
		type: Boolean,
		default: false,
	},
	showCompletedProcesses: {
		type: Boolean,
    default: false,
	}
});



watch(() => props, async (props) => {
	initProvider(props);
	await initActiveProcess(documentId.value, templateId.value);
}, { immediate: true, deep: true });

await initSettings();

provide('access', computed(() => props.access));
</script>