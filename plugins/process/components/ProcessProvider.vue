<template>
	<Preloader :loading="loading">
		<slot v-if="!loading" />
	</Preloader>
</template>
<script setup>
import { notify, useSetting } from '@/plugins/process/utils';
import { computed, inject, onMounted, provide, ref, watchEffect } from 'vue';
import Preloader from '@/plugins/process/components/common/Preloader.vue';

const { ProcessRepo } = inject('useRepo');
const { initSettings } = useSetting();

const props = defineProps({
	templateId: Number,
	executorId: Number,
	userId: Number,
	access: {
		type: Object,
	},
	document: {
		type: Object,
		validator(document) {
			return !!document.id;
		},
	},
});

const activeProcess = ref(null);
const executorId = computed(() => props.executorId);
const userId = computed(() => props.userId);
const documentId = computed(() => props.document.id);
const templateId = computed(() => props.templateId);
const access = computed(() => props.access);
const document = computed(() => props.document);

const loading = ref(true);

const setActiveProcess = prc => {
	activeProcess.value = prc;
};

const updateProcess = async () => {
	try {
		loading.value = true;
		setActiveProcess(await ProcessRepo.get({
			document_id: documentId.value,
			template_id: templateId.value,
		}));
	} catch (e) {
		notify.fetchError(e.message);
		throw e;
	} finally {
		loading.value = false;
	}
}

watchEffect(async () => {
	await updateProcess();
});

onMounted(async () => {
	await initSettings();
});

provide('activeProcess', activeProcess);
provide('executorId', executorId);
provide('userId', userId);
provide('setActiveProcess', setActiveProcess);
provide('documentId', documentId);
provide('templateId', templateId);
provide('access', access);
provide('document', document);
provide('updateProcess', updateProcess);

defineExpose({
	updateProcess,
});
</script>