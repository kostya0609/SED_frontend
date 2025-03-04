<template>
	<el-collapse
		accordion
		v-model="activeRoute"
		@change="handleChangeActiveRoute"
	>
		<el-collapse-item
			v-for="(route, idx) in approvalRoutes"
			:key="route"
			:name="idx"
		>
			<template #title>
				<span>{{ `${route.id ? route.id + '. ' : ''}${route.title}` }}</span>
			</template>

			<template #default>
				<slot
					name="item"
					:route="approvalRoutes[idx]"
					:routeIndex="idx"
				/>
			</template>
		</el-collapse-item>
	</el-collapse>
</template>

<script setup>
import { useApprovalRoute, useActiveRoute } from '@/plugins/approval-routes/entities/approval-route';

const { approvalRoutes } = useApprovalRoute();
const { setActiveRoute, activeRoute } = useActiveRoute();

const handleChangeActiveRoute = (routeIndex) => {
	setActiveRoute(routeIndex);
};
</script>