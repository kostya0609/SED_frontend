import { ref } from "vue";
import { notify } from "@common/shared/utils";
import { DocumentRouteRepo } from '@document-routes/document-route/entities/document-route';

const documentRoute = ref(null);
const loading = ref(false);

export const useDocumentRoute = () => {

	/**
	* @param {number} id
	*/
	const initDocumentRoute = async (id) => {
		try {
			loading.value = true;
			documentRoute.value = await DocumentRouteRepo.get({ id });
		} catch (e) {
			notify.fetchError(e.message);
			throw e;
		} finally {
			loading.value = false;
		}
	};

	const updateDocumentRoute = async () => {
		try {
			if (!documentRoute.value || !documentRoute.value.id) throw new Error('Для обновления маршрута необходимо сначала вызвать функцию initDocumentRoute');
			loading.value = true;
			documentRoute.value = await DocumentRouteRepo.get({ id: documentRoute.value.id });		
		} catch (e) {
			notify.fetchError(e.message);
			throw e;
		} finally {
			loading.value = false;
		}
	};

	/**
	 * @param {number} id
	 * @returns {Promise<void>}
	 */
	const remove = async (id) => {
		try {
			loading.value = true;
			await DocumentRouteRepo.delete({ id });
		} catch (e) {
			notify.fetchError(e.message);
			throw e;
		} finally {
			loading.value = false;
		}
	};	

	/**
	 * @param {number} id
	 * @returns {Promise<void>}
	 */
	const deactivate = async (id) => {
		try {
			loading.value = true;
			await DocumentRouteRepo.deactivate({ id });
		} catch (e) {
			notify.fetchError(e.message);
			throw e;
		} finally {
			loading.value = false;
		}
	};	

	return {
		documentRoute,
		loading,
		initDocumentRoute,
		updateDocumentRoute,
		remove,
		deactivate		
	};
};