<template>
	<Preloader :loading="loading">
		<AddRoute :module-name="moduleName" />
		<RouteList
			v-slot:item="{ routeIndex }"
			class="mt-3"
		>
			<Form v-model:route="approvalRoutes[routeIndex]" />
		</RouteList>
	</Preloader>
</template>

<script setup>
import { ref, provide } from 'vue';
import { Preloader } from '@/plugins/approval-routes/shared/ui';
import { useTypeRepo } from '@/plugins/approval-routes/shared/api';
import { Form } from '@/plugins/approval-routes/widgets/route-form';
import { RouteList } from '@/plugins/approval-routes/widgets/route-list';
import { AddRoute } from '@/plugins/approval-routes/features/add-route';
import { useApprovalRoute } from '@/plugins/approval-routes/entities/approval-route';

const props = defineProps({
	moduleName: { type: String, required: true },
	initList: { type: Function, required: true },
	created: { type: Function, required: true },
	updated: { type: Function, required: true },
	deleted: { type: Function, required: true },
});

const { initApprovalRoutes, approvalRoutes } = useApprovalRoute();

const TypeRepo = useTypeRepo();

const loading = ref(false);
const groupTypes = ref([]);

try {
	loading.value = true;

	const routes = await props.initList();

	if (!Array.isArray(routes)) throw new Error('Список маршрутов согласования должен быть массивом');

	initApprovalRoutes(routes);

	const types = await TypeRepo.list();
	groupTypes.value = types.group_types;
} catch (e) {
	throw e;
} finally {
	loading.value = false;
};


provide('created', props.created);
provide('updated', props.updated);
provide('deleted', props.deleted);

provide('groupTypes', groupTypes);
</script>