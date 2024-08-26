<template>
	<Preloader :loading="loading">
		<h3 class="header_h3">
			Информация о маршруте - {{ documentRoute.title }}
		</h3>

		<el-tabs
			v-model="activeTab"
			type="border-card"
		>
			<el-tab-pane
				label="Маршрут"
				name="description"
				lazy
			>
				<RouteDescription :documentRoute="documentRoute" />

				<el-space class="mt-3">
					<ChangeDataButton />
					<RouteDeleteButton :id="documentRoute.id" />
					<RouteDeactivateButton
						:id="documentRoute.id"
						:disabled="!documentRoute.is_active"
						@update="updateDocumentRoute"
					/>
				</el-space>

			</el-tab-pane>
			<el-tab-pane
				label="Шаблоны документов маршрута"
				name="documentTemplate"
				lazy
			>
				<DocumentTemplateList />
			</el-tab-pane>
		</el-tabs>
	</Preloader>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { useBackButton } from '@/plugins/menu';
import { Preloader } from '@common/shared/ui';
import { RouteDescription } from '@document-routes/document-route/widgets/description';
import { DocumentTemplateList } from '@document-routes/document-template/widgets/template-list';
import { useDocumentRoute, useActiveTab } from "@document-routes/document-route/entities/document-route";
import { ChangeDataButton } from '@document-routes/document-route/features/change-data';
import { RouteDeleteButton } from '@document-routes/document-route/features/route-delete';
import { RouteDeactivateButton } from '@document-routes/document-route/features/route-deactivate';

const {activeTab} = useActiveTab();  

const route = useRoute();
const { documentRoute, loading, initDocumentRoute, updateDocumentRoute } = useDocumentRoute();


await initDocumentRoute(route.params.id);

useBackButton({ fallbackPath: '/sed' });
</script>