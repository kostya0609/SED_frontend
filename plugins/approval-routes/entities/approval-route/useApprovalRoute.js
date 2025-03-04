import { ref } from "vue";

const approvalRoutes = ref([]);

export const useApprovalRoute = () => {
	const initApprovalRoutes = (routes) => {
		approvalRoutes.value = routes;
	};

	const addRoute = (template) => {
		const route = {
			id: null,
			title: `Маршрут согласования №${approvalRoutes.value.length + 1}`,
			is_active: true,
			process_template: JSON.parse(JSON.stringify(template)),
			stages: JSON.parse(JSON.stringify(template.stages)),
		};

		approvalRoutes.value.push(route);

		return route;
	};

	const deleteRoute = (route) => {
		const index = approvalRoutes.value.findIndex(r => r === route);

		if (index > -1) {
			approvalRoutes.value.splice(index, 1);
		}
	};

	return {
		initApprovalRoutes,
		approvalRoutes,
		addRoute,
		deleteRoute,
	};
};