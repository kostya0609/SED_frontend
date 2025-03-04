<template>
	<el-button
		type="primary"
		@click="showBasedModal = true"
		v-bind="$attrs"
	>
		<slot>
			Создать на основании
		</slot>
	</el-button>

	<CreateBasedModal
		v-model:show="showBasedModal"
		:document="document"
		:create="createDocuments"
	/>
</template>
<script setup>
import CreateBasedModal from './CreateBasedModal.vue';
import { BasedCreationRepo } from '@documents/common/shared/api';
import { notify } from '@common/shared/utils';
import { ref } from 'vue';
import { createDocumentLink } from '@documents/common/entities/document';

defineProps({
	document: {
		type: Object,
		requared: true,
	}
});

const emit = defineEmits(['created']);

const loading = ref(false);
const showBasedModal = ref(false);

const createDocuments = async (document_id, checkTmpDocs, selectedType) => {
	const left = ref(0);
	const top = ref(0);

	if (checkTmpDocs.value.length) {
		try {
			loading.value = true;
			let new_documents = await BasedCreationRepo.createForm({
				based_document_id: document_id,
				template_ids: checkTmpDocs.value,
			});

			emit('created');

			new_documents.forEach(doc => {
				let link = createDocumentLink(doc.type.id, 'detail', doc.document_id);
				window.open(link, '_blank', `popup=false, width=1000, height=600, left=${100 * left.value}, top=${100 * top.value}`);
				left.value++; top.value++;
			});		

		} catch (e) {
			notify.fetchError(e.message);
			throw e;
		} finally {
			loading.value = false;
		}
	}

	selectedType.value.forEach((type) => {
		let link = `${createDocumentLink(type, 'create')}/${document_id}`;
		window.open(link, '_blank', `popup=false, width=1000, height=600, left=${100 * left.value}, top=${100 * top.value}`);
		left.value++; top.value++;
	});
}

</script>