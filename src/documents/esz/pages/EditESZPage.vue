<template>
	<Preloader :loading="loading">
		<ProcessProvider
			:document="documentForProcess"
			:template-id="document.process_template_id"
			:executor-id="document.initiator.user.id"
			:user-id="getUserId()"
			:access="{ full: false, execute: true, selectRoles: checkUserRights('full_access') }"
			module-name="SEDESZ"
			v-if="checkDocumentStatus(DOCUMENT_STATUS.PREPARATION)"
		>
			<Form
				mode="edit"
				:data="document"
				v-slot:process
			>
				<ApprovalESZ
					:approval-routes="approvalRoutes"
					:show-statuses="false"
					:show-buttons-on-preparation="false"
					column-on-preparation
					:show-head="false"
				/>
			</Form>
		</ProcessProvider>
		<Form
			mode="edit"
			:data="document"
			v-else
		/>
	</Preloader>
</template>

<script setup>
import { Preloader } from '@common/shared/ui/index.js';
import { Form } from '@documents/esz/widgets/form';
import { useBackButton } from '@/plugins/menu';
import { ref } from "vue";
import { useDocument } from '@documents/esz/entities/esz';
import { useUser } from '@/common/app/composables';
import { ApprovalESZ } from "@documents/esz/widgets/approval-esz";
import { ApprovalRoutesRepo } from '@documents/common/shared/api';
import { notify } from '@/plugins/process/common';
import { DOCUMENT_STATUS } from '@documents/esz/entities/esz/constants';
import { useRoute } from 'vue-router';

const route = useRoute();
const { getUserId, checkUserRights } = useUser();

const props = defineProps({
	hideBackButton: {
		type: Boolean,
		default: false,
	}
});

const loading = ref(false);

const { document, initDocument, checkDocumentStatus } = useDocument();

await initDocument(route.params.id);

if (!props.hideBackButton) {
	useBackButton({ fallbackPath: '/sed' });
}

const documentForProcess = {
	id: document.value.id,
	name: document.value.number,
	link: location.href,
};

const approvalRoutes = ref([]);

if (document.value.tmp_doc_id && checkDocumentStatus(DOCUMENT_STATUS.PREPARATION)) {
	try {
		loading.value = true;

		approvalRoutes.value = await ApprovalRoutesRepo.list({
			tmp_doc_id: document.value.tmp_doc_id,
			process_template_id: document.value.process_template_id,
		});

	} catch (e) {
		notify.fetchError(e.message);
		throw e;
	} finally {
		loading.value = false;
	}
};
</script>