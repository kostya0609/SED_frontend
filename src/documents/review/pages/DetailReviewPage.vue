<template>
	<Preloader :loading="loading">
		<ProcessProvider
			:document="documentForProcess"
			:template-id="document.process_template_id"
			:executor-id="document.initiator.id"
			:user-id="getUserId()"
			:access="processAccesses"
			ref="processRef"
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
					<el-space class="mt-3">
						<ChangeDataButton v-if="isEdit" />
						<SendToApprovalButton v-if="isEdit" :document-id="document.id" />
						<DocumentCancelButton
							v-if="isCancel"
							:document_id="document.id"
						/>
						<DocumentDeleteButton
							v-if="isEdit"
							:document_id="document.id"
						/>
					</el-space>
				</el-tab-pane>
				<el-tab-pane
					label="Дополнительная информация"
					name="additionalInfo"
					lazy
				>
					<AdditionalInfo />
				</el-tab-pane>
				<el-tab-pane
					label="Бизнес процесс"
					name="process"
					lazy
				>
					<ApprovalReview :document="document" />
				</el-tab-pane>
				<el-tab-pane
					label=Чат
					name="interaction"
					lazy
				>
					<Interaction ref="interactionRef" />
				</el-tab-pane>
				<el-tab-pane
					label="Иерархия"
					name="hierarchy"
					lazy
				>
					<Hierarchy />
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
import { useRoute } from 'vue-router';
import { useBackButton } from '@/plugins/menu';
import { Preloader, DocumentHistory, ProcessHistory } from '@common/shared/ui';
import { Description } from "@documents/review/widgets/description";
import { ApprovalReview } from "@documents/review/widgets/approval-review";
import { AdditionalInfo } from "@documents/review/widgets/additional-info";
import { Hierarchy } from "@documents/review/widgets/hierarchy";
import { ChangeDataButton } from '@documents/review/features/change-data';
import { SendToApprovalButton } from '@documents/review/features/send-to-approval';
import { DocumentCancelButton } from '@documents/review/features/document-cancel';
import { DocumentDeleteButton } from '@documents/review/features/document-delete';
import { useActiveTab, useDocument } from "@documents/review/entities/review";
import { useUser } from "@/common/app/composables";
import { DOCUMENT_STATUS } from "@documents/review/entities/review/constants";
import { ref, onUnmounted, computed, provide } from 'vue';

const route = useRoute();
const { getUserId, checkUserRights } = useUser();
const { activeTab, setActiveTab } = useActiveTab();
const { document, loading, initDocument, checkDocumentRights, checkDocumentStatus } = useDocument();
const processRef = ref();
const interactionRef = ref();

await initDocument(route.params.id);

const isEdit = computed(() => checkDocumentRights('document_full_access') && checkDocumentStatus(DOCUMENT_STATUS.PREPARATION));

const isCancel = computed(() => checkDocumentRights('document_full_access') && checkDocumentStatus(DOCUMENT_STATUS.ARCHIVE_WORKED));

const processAccesses = {
	full: checkUserRights('full_access'),
	execute: checkDocumentStatus([
		DOCUMENT_STATUS.PREPARATION,
	]) ? false : checkDocumentRights('document_full_access'),
};

const documentForProcess = {
	id: document.value.id,
	name: document.value.number,
	link: location.href,
};

useBackButton({ fallbackPath: '/sed' });

onUnmounted(() => {
	setActiveTab('description');
})

provide('processRef', processRef);
provide('interactionRef', interactionRef);
</script>