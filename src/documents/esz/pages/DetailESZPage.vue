<template>
	<Preloader :loading="loading">

		<h1 style="color:red; ">В РАЗРАБОТКЕ</h1>
		<br/>
		
		<ProcessProvider
			:document="documentForProcess"
			:template-id="document.process_template_id"
			:executor-id="document.responsible_id"
			:user-id="getUserId()"
			:access="processAccesses">

			<h3 class="header_h3">
				{{ document.number }}, статус - {{ document.status.title }}.
			</h3>

			<el-tabs v-model="activeTab" type="border-card">
				<el-tab-pane label="Описание документа" name="description">
					<Description :document="document" />
				</el-tab-pane>
				<el-tab-pane label="Дополнительная информация" name="additionalInfo">
					<AdditionalInfo />
				</el-tab-pane>
				<el-tab-pane label="Бизнес процесс" name="process">
					<ApprovalESZ :document="document" />
				</el-tab-pane>
				<el-tab-pane label=Чат name="interaction">
					<Interaction />
				</el-tab-pane>
				<el-tab-pane label="Иерархия" name="hierarchy">
					<Hierarchy />
				</el-tab-pane>
				<el-tab-pane label="История изменений" name="history">
					<History />
				</el-tab-pane>
			</el-tabs>

			<el-space class="mt-3">
				<ChangeDataButton />
				<SendToApprovalButton />
				<DocumentCancelButton />
			</el-space>
		</ProcessProvider>
	</Preloader>

</template>
<script setup>
import { useRoute } from 'vue-router';
import { useBackButton } from '@/plugins/menu';
import { Preloader } from '@common/shared/ui';
import { Description } from "@documents/esz/widgets/description";
import { ApprovalESZ } from "@documents/esz/widgets/approval-esz";
import { AdditionalInfo } from "@documents/esz/widgets/additional-info";
import { Hierarchy } from "@documents/esz/widgets/hierarchy";
import { History } from "@documents/esz/widgets/history";
import { ChangeDataButton } from '@documents/esz/features/change-data';
import { SendToApprovalButton } from '@documents/esz/features/send-to-approval';
import { DocumentCancelButton } from '@documents/esz/features/document-cancel';
import { useActiveTab, useDocument } from "@documents/esz/entities/esz";
import { useUser } from "@/common/app/composables";

const route = useRoute();
const { getUserId, can } = useUser();
const { activeTab } = useActiveTab();
const { document, loading, initDocument } = useDocument();

await initDocument(route.params.id);

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
</script>