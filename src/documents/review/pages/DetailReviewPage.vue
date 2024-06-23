<template>
	<Preloader :loading="loading">
		<ProcessProvider
			:document="documentForProcess"
			:template-id="document.process_template_id"
			:executor-id="document.responsible.id"
			:user-id="getUserId()"
			:access="processAccesses"
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
				>
					<Description :document="document" />
					<el-space class="mt-3">
						<ChangeDataButton v-if="isEdit"/>
						<SendToApprovalButton v-if="isEdit"/>
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
				>
					<AdditionalInfo />
				</el-tab-pane>
				<el-tab-pane
					label="Бизнес процесс"
					name="process"
				>
					<ApprovalReview :document="document" />
				</el-tab-pane>
				<el-tab-pane
					label=Чат
					name="interaction"
				>
					<Interaction />
				</el-tab-pane>
				<el-tab-pane
					label="Иерархия"
					name="hierarchy"
				>
					<Hierarchy />
				</el-tab-pane>
				<el-tab-pane
					label="История решений"
					name="history"
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
import { onUnmounted, computed } from 'vue';

const route = useRoute();
const { getUserId, can } = useUser();
const { activeTab, setActiveTab } = useActiveTab();
const { document, loading, initDocument } = useDocument();

await initDocument(route.params.id);

const isEdit = computed(() => document.value.full_access && document.value.status_id === DOCUMENT_STATUS.PREPARATION);
const isCancel = computed(() => document.value.full_access && document.value.status_id === DOCUMENT_STATUS.ARCHIVE_WORKED);

const processAccesses = {
	full: can('full_access'),
	execute: document.value.full_access || can('full_access'),
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

</script>