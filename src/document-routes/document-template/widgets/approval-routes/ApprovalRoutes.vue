<template>
	<ApprovalRoutes
		:module-name="moduleName"
		:init-list="getList"
		:created="createRoute"
		:updated="updateRoute"
		:deleted="deleteRoute"
	/>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { notify } from "@common/shared/utils";
import { ApprovalRoutes } from '@/plugins/approval-routes';
import { ApprovalRoutesRepo } from '@document-routes/document-template/entities/approval-routes/api';

const props = defineProps({
	documentTemplateId: { type: Number, required: true },
	moduleName: { type: String, required: true },
});

const route = useRoute();

const getList = async () => {
	try {
		return await ApprovalRoutesRepo.list({
			tmp_doc_id: props.documentTemplateId,
		});
	} catch (e) {
		notify.fetchError(e.message);
		throw e;
	}
};

const createRoute = async (approvalRoute) => {
	try {
		approvalRoute.tmp_doc_id = +route.params.id;

		return await ApprovalRoutesRepo.create(approvalRoute);
	} catch (e) {
		notify.fetchError(e.message);
		throw e;
	}
};

const updateRoute = async (approvalRoute) => {
	try {
		approvalRoute.tmp_doc_id = +route.params.id;
		return await ApprovalRoutesRepo.update(approvalRoute);
	} catch (e) {
		notify.fetchError(e.message);
		throw e;
	}
};

const deleteRoute = async (approvalRoute) => {
	approvalRoute.tmp_doc_id = +route.params.id;
	return await ApprovalRoutesRepo.delete(approvalRoute);
};
</script>