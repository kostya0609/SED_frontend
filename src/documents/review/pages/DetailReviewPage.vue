<template>
	<EditReviewPage
		hide-back-button
		v-if="isDraft"
	/>
	<Preloader
		:loading="loading"
		v-else-if="document"
	>
		<ProcessProvider
			:document="documentForProcess"
			:template-id="document.process_template_id"
			:executor-id="document.initiator.user.id"
			:user-id="getUserId()"
			:access="processAccesses"
			module-name="SEDReview"
			:is-debug="checkUserRights('full_access')"
		>

			<h3 class="header_h3">
				{{ document.number }}, статус - {{ document.status.title }}.
			</h3>

			<el-tabs
				v-model="activeTab"
				type="border-card"
			>
				<el-tab-pane
					label="Описание документа"
					name="description"
					lazy
				>
					<Description :document="document" />
					<div class="action-buttons mt-3">
						<ChangeDataButton v-if="isEdit" />
						<SendToApprovalButton
							v-if="isEdit"
							:document-id="document.id"
						/>
						<DocumentCancelButton
							v-if="isCancel"
							:document_id="document.id"
						/>
						<CreateBasedButton
							:document="document"
							@created="documentsCreated"
							class="action-buttons--end"
						/>
					</div>

				</el-tab-pane>
				<el-tab-pane
					label="Требования маршрута"
					name="additionalInfo"
					lazy
				>
					<AdditionalInfo :document="document" />
				</el-tab-pane>
				<el-tab-pane
					label="Бизнес процесс"
					name="process"
					lazy
				>
					<ApprovalReview :approval-routes="approvalRoutes" />
				</el-tab-pane>
				<el-tab-pane
					label=Чат
					name="interaction"
					lazy
				>
					<Interaction />
				</el-tab-pane>
				<el-tab-pane
					label="Иерархия"
					name="hierarchy"
					lazy
				>
					<Hierarchy
						:hierarchyTree="document.hierarchy"
						:document_id="document.common_document_id"
					/>
				</el-tab-pane>
				<el-tab-pane
					label="История решений"
					name="history"
					lazy
				>
					<ProcessHistory :history="document.process_history" />
				</el-tab-pane>
				<el-tab-pane
					label="История документа"
					name="process_history"
					lazy
				>
					<DocumentHistory :history="document.history" />
				</el-tab-pane>

			</el-tabs>

		</ProcessProvider>
	</Preloader>

</template>
<script setup>
import { useRoute, useRouter } from 'vue-router';
import { useActionButtons } from '@/plugins/menu';
import { Preloader, DocumentHistory, ProcessHistory } from '@common/shared/ui';
import { Description } from "@documents/review/widgets/description";
import { ApprovalReview } from "@documents/review/widgets/approval-review";
import { AdditionalInfo } from "@documents/review/widgets/additional-info";
import { Hierarchy } from "@documents/common/widgets/hierarchy";
import { ChangeDataButton } from '@documents/review/features/change-data';
import { SendToApprovalButton } from '@documents/review/features/send-to-approval';
import { DocumentCancelButton } from '@documents/review/features/document-cancel';
import { useActiveTab, useDocument } from "@documents/review/entities/review";
import { useUser } from "@/common/app/composables";
import { DOCUMENT_STATUS } from "@documents/review/entities/review/constants";
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { CreateBasedButton } from '@documents/common/features/create-based-on';
import { ApprovalRoutesRepo } from '@documents/common/shared/api';
import { notify } from "@common/shared/utils";
import EditReviewPage from './EditReviewPage.vue';
import { useActiveList } from '@/documents/common/entities/document';

const route = useRoute();
const router = useRouter();
const { getUserId, checkUserRights } = useUser();
const { activeTab, setActiveTab } = useActiveTab();
const { document, loading, initDocument, updateDocument, checkDocumentRights, checkDocumentStatus } = useDocument();
const { addButton, clearButtons } = useActionButtons();

await initDocument(route.params.id);

const { activeList } = useActiveList();

const isEdit = computed(() => checkDocumentRights('document_full_access') && checkDocumentStatus(DOCUMENT_STATUS.PREPARATION));

const isCancel = computed(() => checkDocumentRights('document_full_access') && (checkDocumentStatus([DOCUMENT_STATUS.ARCHIVE_WORKED, DOCUMENT_STATUS.PREPARATION])));

const isDraft = computed(() => checkDocumentStatus(DOCUMENT_STATUS.DRAFT));

const processAccesses = {
	full: checkUserRights('full_access'),
	execute: checkDocumentStatus([
		DOCUMENT_STATUS.PREPARATION,
	]) ? false : checkDocumentRights('document_full_access'),
	selectRoles: checkUserRights('full_access'),
};

const documentForProcess = {
	id: document.value.id,
	name: document.value.number,
	link: location.href,
};

const approvalRoutes = ref([]);

if (document.value.tmp_doc_id && !checkDocumentStatus(DOCUMENT_STATUS.DRAFT)) {
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

const documentsCreated = async () => {
	await updateDocument();
	setActiveTab('hierarchy');
};

const broadcastChannel = new BroadcastChannel('creation-based');

broadcastChannel.onmessage = async () => {
	setActiveTab('hierarchy');
	await initDocument(route.params.id);
};

onMounted(() => {
	addButton({
		title: 'ВЕРНУТЬСЯ НАЗАД',
		onClick: () => {
			router.push({ path: activeList.value || `/sed` });
		}
	});
});

onUnmounted(() => {
	setActiveTab('description');
	broadcastChannel.close();
	clearButtons();
})

</script>