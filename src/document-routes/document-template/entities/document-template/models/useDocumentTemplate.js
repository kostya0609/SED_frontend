import { ref } from "vue";
import { notify } from "@common/shared/utils";
import { DocumentTemplateRepo } from '@document-routes/document-template/entities/document-template';

const loading = ref(false);
const documentTemplate = ref(null);
const documentTemplatesTree = ref(null);

export const useDocumentTemplate = () => {

	/**
	* @param {number} id
	*/
	const initDocumentTemplate = async (id) => {
		try {
			loading.value = true;
			documentTemplate.value = await DocumentTemplateRepo.get({ id });
		} catch (e) {
			notify.fetchError(e.message);
			throw e;
		} finally {
			loading.value = false;
		}
	};

	const updateDocumentTemplate = async () => {
		try {
			if (!documentTemplate.value || !documentTemplate.value.id) throw new Error('Для обновления шаблона документа у маршрута необходимо сначала вызвать функцию initDocumentTemplate');
			loading.value = true;
			documentTemplate.value = await DocumentTemplateRepo.get({ id: documentTemplate.value.id });		
		} catch (e) {
			notify.fetchError(e.message);
			throw e;
		} finally {
			loading.value = false;
		}
	};


	/**
	* @param {number} route_id
	*/
	const initDocumentTemplatesTree = async (route_id) => {
		try {
			loading.value = true;
			documentTemplatesTree.value = await DocumentTemplateRepo.list({ route_id });
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
			await DocumentTemplateRepo.delete({ id });
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
			await DocumentTemplateRepo.deactivate({ id });
		} catch (e) {
			notify.fetchError(e.message);
			throw e;
		} finally {
			loading.value = false;
		}
	};	

	return {
		loading,

		documentTemplate,	
		initDocumentTemplate,
		updateDocumentTemplate,
		remove,		
		deactivate,

		documentTemplatesTree,	
		initDocumentTemplatesTree,		
	};
};