import { inject, ref } from "vue";
import { notify, useActiveProcess } from "@/plugins/process/common";

const approvalRoutes = ref([]);
const activeRoute = ref(null);
const loading = ref(false);

export const useApprovalRoute = () => {
	const { createActiveProcess, activeProcess, getCountParticipants } = useActiveProcess();
	const { ApprovalRouteRepo } = inject('useRepo');
	const emit = inject('emit', null);

	const initRoute = () => {
		activeRoute.value = activeProcess.value.isCreated() ? activeProcess.value.process.approval_route_id : null;
	};

	const _handleChangeRoute = () => {
		if (emit) {
			emit('participantCountChanged', getCountParticipants());
		}
	};

	/**
	 * @param {number} routeId
	 * @param {number} processId
	 */
	const applyRoute = async (routeId, processId) => {
		try {

			loading.value = true;
			const result = await ApprovalRouteRepo.apply(!!routeId ? routeId : null, processId);
			const _activeProcess = createActiveProcess(result);
			activeProcess.value = _activeProcess;
			_handleChangeRoute();
		} catch (e) {
			notify.fetchError(e.message);
			throw e;
		} finally {
			loading.value = false;
		}
	};

	const resetRoute = async (processId) => {
		try {
			loading.value = true;
			const result = await ApprovalRouteRepo.apply(null, processId);
			const _activeProcess = createActiveProcess(result);
			activeProcess.value = _activeProcess;
			_handleChangeRoute();
		} catch (e) {
			notify.fetchError(e.message);
			throw e;
		} finally {
			loading.value = false;
		}
	};

	return {
		initRoute,
		approvalRoutes,
		activeRoute,
		loading,

		applyRoute,
		resetRoute,
	};
};