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
					<el-space
						class="mt-3"
						v-if="isEdit"
					>
						<ChangeDataButton />
						<SendToApprovalButton :document-id="document.id" />
						<DocumentCancelButton :document_id="document.id" />
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
					<ApprovalESZ :document="document" />
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
import { Description } from "@documents/esz/widgets/description";
import { ApprovalESZ } from "@documents/esz/widgets/approval-esz";
import { AdditionalInfo } from "@documents/esz/widgets/additional-info";
import { Hierarchy } from "@documents/esz/widgets/hierarchy";
import { ChangeDataButton } from '@documents/esz/features/change-data';
import { SendToApprovalButton } from '@documents/esz/features/send-to-approval';
import { DocumentCancelButton } from '@documents/esz/features/document-cancel';
import { useActiveTab, useDocument } from "@documents/esz/entities/esz";
import { useUser } from "@/common/app/composables";
import { DOCUMENT_STATUS } from "@documents/esz/entities/esz/constants";
import { onUnmounted, computed, reactive, ref, provide } from 'vue';

const route = useRoute();
const { getUserId, checkUserRights } = useUser();
const { activeTab, setActiveTab } = useActiveTab();
const { document, loading, initDocument, checkDocumentRights, checkDocumentStatus } = useDocument();

await initDocument(route.params.id);

const processRef = ref();
const interactionRef = ref();

const isEdit = computed(() => checkDocumentRights('document_full_access') && checkDocumentStatus([
	DOCUMENT_STATUS.PREPARATION,
	DOCUMENT_STATUS.FIX,
	DOCUMENT_STATUS.FIX_SIGNING,
	DOCUMENT_STATUS.FIX_RESOLUTION
]));

const processAccesses = reactive({
	/** Администратор по прежнему имеет полный доступ */
	full: checkUserRights('full_access'),

	/** Если документ на устранении замечаний, то блокируем возможность редактировать участников и запуск процеса */
	execute: checkDocumentStatus([
		DOCUMENT_STATUS.FIX_SIGNING,
		DOCUMENT_STATUS.FIX_RESOLUTION,
	]) ? false : checkDocumentRights('document_full_access'),
});

const documentForProcess = {
	id: document.value.id,
	name: document.value.number,
	link: location.href,
};

useBackButton({ fallbackPath: '/sed' });

onUnmounted(() => {
	setActiveTab('description');
});

provide('processRef', processRef);
provide('interactionRef', interactionRef);
</script>