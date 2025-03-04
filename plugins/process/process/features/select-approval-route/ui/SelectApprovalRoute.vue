<template>
	<el-select
		v-if="approvalRoutes.length > 1 && activeProcess.isCreated() && activeProcess.process.isPreparation()"
		v-model="activeRoute"
		@change="routeId => handleChangeApprovalRoute(routeId, activeProcess.process.id)"
		clearable
		placeholder="Выбрать маршрут согласования"
		value-key="id"
	>
		<el-option
			v-for="item in approvalRoutes"
			:key="item.id"
			:label="`${item.title}${item.is_active ? '' : ' (деактивирован)'}`"
			:value="item.id"
			:disabled="!item.is_active"
		/>
	</el-select>
</template>
<script setup>
import { useApprovalRoute } from '../model';
import { useActiveProcess } from '@/plugins/process/common';

const { activeProcess } = useActiveProcess();
const { initRoute, approvalRoutes, activeRoute, applyRoute, resetRoute } = useApprovalRoute();

initRoute();

const handleChangeApprovalRoute = async (routeId, processId) => {
	if (!routeId) {
		resetRoute(processId);
	} else {
		await applyRoute(routeId, processId);
	}
};
</script>