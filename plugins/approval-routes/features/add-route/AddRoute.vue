<template>
	<div class="add-route">
		<el-select
			v-model="template"
			placeholder="Выбрать шаблон процесса"
			value-key="id"
		>
			<el-option
				v-for="template in templates"
				:key="template.id"
				:label="`${template.id}. ${template.title}`"
				:value="template"
			/>
		</el-select>

		<el-tooltip
			effect="dark"
			content="Добавить маршрут"
			placement="top"
			:disabled="!template"
		>
			<el-button
				:type="!template ? 'default' : 'primary'"
				@click="addApprovalRoute(template)"
				:disabled="!template"
			>
				Добавить
			</el-button>
		</el-tooltip>
	</div>
</template>
<script setup>
import { ref } from 'vue';
import { notify } from '@/plugins/approval-routes/shared/utils';
import { useApprovalRouteRepo } from '@/plugins/approval-routes/shared/api';
import { useApprovalRoute, useActiveRoute } from '@/plugins/approval-routes/entities/approval-route';

const props = defineProps({
	moduleName: { type: String, required: true },
})

const loading = defineModel('loading');

const ApprovalRepo = useApprovalRouteRepo();
const { setActiveRoute } = useActiveRoute();
const { addRoute, approvalRoutes } = useApprovalRoute();

const template = ref(null);
const templates = ref([]);

try {
	loading.value = true;
	templates.value = await ApprovalRepo.getProcessTemplates(props.moduleName);
} catch (e) {
	notify.fetchError(e.message);
	throw e;
} finally {
	loading.value = false;
};

const addApprovalRoute = (_template) => {
	addRoute(_template);
	template.value = null;
	setActiveRoute(approvalRoutes.value.length - 1);
};
</script>
<style scoped>
.add-route {
	display: flex;
	justify-content: center;
	gap: 10px
}
</style>