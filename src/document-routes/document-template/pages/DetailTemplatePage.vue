<template>
	<Preloader :loading="loading">
		<h3 class="header_h3">
			Информация о шаблоне документа - {{ documentTemplate.title }}
		</h3>

		<el-tabs
			v-model="activeTab"
			type="border-card"
		>
			<el-tab-pane
				label="Шаблон документа"
				name="description"
				lazy
			>
				<EszDescription
					v-if="documentTemplateTypeId == DOCUMENT_TEMPLATE_TYPE.ESZ"
					:document-template="documentTemplate"
				/>
				<DirectiveDescription
					v-if="documentTemplateTypeId == DOCUMENT_TEMPLATE_TYPE.DIRECTIVE"
					:document-template="documentTemplate"
				/>
				<ReviewDescription
					v-if="documentTemplateTypeId == DOCUMENT_TEMPLATE_TYPE.REVIEW"
					:document-template="documentTemplate"
				/>

				<el-space class="mt-3">
					<ChangeDataButton />
					<TemplateDeleteButton
						:id="documentTemplate.id"
						v-if="!documentTemplate.check_template_usage && !documentTemplate.children.length"
					/>
					<TemplateDeactivateButton
						:id="documentTemplate.id"
						:disabled="!documentTemplate.is_active"
						@update="updateDocumentTemplate"
						v-else
					/>
				</el-space>

			</el-tab-pane>

			<el-tab-pane
				label="Требования маршрута"
				name="requirements"
				lazy
			>
				<Requirements v-model="documentTemplate" />

			</el-tab-pane>

			<el-tab-pane
				label="Маршруты согласования"
				name="approveRoutes"
				lazy
			>
				<ApprovalRoutes
					:document-template-id="documentTemplate.id"
					:module-name="moduleName"
				/>
			</el-tab-pane>

			<el-tab-pane
				label="Автоматизация"
				name="automation"
				lazy
			>
				<Automation />
			</el-tab-pane>
		</el-tabs>

	</Preloader>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { Preloader } from '@common/shared/ui/index.js';
import { useDocumentTemplate } from "@document-routes/document-template/entities/document-template";
import { useBackButton } from '@/plugins/menu';
import { EszDescription } from '@document-routes/document-template/entities/document-template';
import { DirectiveDescription } from '@document-routes/document-template/entities/document-template';
import { ReviewDescription } from '@document-routes/document-template/entities/document-template';
import { Requirements } from '@document-routes/document-template/widgets/requirements';
import { ChangeDataButton } from '@document-routes/document-template/features/change-data';
import { TemplateDeleteButton } from '@document-routes/document-template/features/template-delete';
import { TemplateDeactivateButton } from '@document-routes/document-template/features/template-deactivate';
import { DOCUMENT_TEMPLATE_TYPE } from '@document-routes/common/shared/constants';
import { ApprovalRoutes } from '@document-routes/document-template/widgets/approval-routes';
import { ref, computed } from 'vue';
import { Automation } from '@document-routes/document-template/widgets/automation';
import { useActiveRoute, useActiveTab } from '@document-routes/document-route';
import { router } from '@/common/app/providers';

const { activeRoute } = useActiveRoute();
const { setTemplatesTab } = useActiveTab();


useBackButton({
	onClick() {
		setTemplatesTab();
		router.push(activeRoute.value);
	}
});

const route = useRoute();
const { documentTemplate, loading, initDocumentTemplate, updateDocumentTemplate } = useDocumentTemplate();

await initDocumentTemplate(route.params.id);

const documentTemplateTypeId = documentTemplate.value.type.id;

const moduleName = computed(() => {

	switch (documentTemplateTypeId) {

		case DOCUMENT_TEMPLATE_TYPE.ESZ:
			return 'SEDESZ';

		case DOCUMENT_TEMPLATE_TYPE.DIRECTIVE:
			return 'SEDDirective';

		case DOCUMENT_TEMPLATE_TYPE.REVIEW:
			return 'SEDReview';

		default:
			throw new Error(`Не реализована обработка вычисления названия модуля по тоипу документа: ${documentTemplateTypeId}`);
	}

});

const activeTab = ref('description');

</script>
