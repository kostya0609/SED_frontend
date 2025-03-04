import { ref } from "vue";
import { notify } from "@common/shared/utils";
import { ESZRepo } from "@documents/esz/entities/esz/api";

const document = ref(null);
const documentRights = ref([]);
const loading = ref(false);

export const useDocument = () => {

	/**
	* @param {number} document_id
	* @returns {Promise<void>}
	*/
	const initDocument = async (document_id) => {
		try {
			loading.value = true;
			const result = await ESZRepo.getById({ document_id });

			document.value = result.document;
			documentRights.value = result.rights;

		} catch (e) {
			notify.fetchError(e.message);
			throw e;
		} finally {
			loading.value = false;
		}
	};

	/**
	 * @returns {Promise<void>}
	 */
	const updateDocument = async () => {
		try {
			if (!document.value || !document.value.id) throw new Error('Для обновления документа необходимо сначала вызвать функцию initDocument');

			loading.value = true;
			const result = await ESZRepo.getById({ document_id: document.value.id });

			document.value = result.document;
			documentRights.value = result.rights;

		} catch (e) {
			notify.fetchError(e.message);
			throw e;
		} finally {
			loading.value = false;
		}
	};

	/**
	 * @param {number} document_id
	 * @returns {Promise<void>}
	 */
	const remove = async (document_id) => {
		try {
			loading.value = true;
			await ESZRepo.delete({ document_id });
		} catch (e) {
			notify.fetchError(e.message);
			throw e;
		} finally {
			loading.value = false;
		}
	};

	/**
	 * @param {number} document_id
	 * @returns {Promise<void>}
	 */
	const cancel = async (document_id) => {
		try {
			loading.value = true;
			const esz = await ESZRepo.cancellation(document_id);
			document.value = esz;
		} catch (e) {
			notify.fetchError(e.message);
			throw e;
		} finally {
			loading.value = false;
		}
	};


	/**
	 * @returns {string[]} Возвращает массив прав доступа
	 */
	const getRights = () => {
		return documentRights.value;
	};

	/**
	 * @description Возвращает true, если текущий пользователь имеет права доступа в текущем документе
	 * 
	 * @param {'document_full_access'} rights
	 * @returns {boolean}
	 */
	const checkDocumentRights = (rights) => {
		if (typeof rights === 'string') {
			return documentRights.value.includes(rights);
		} else if (Array.isArray(rights)) {
			for (const value of rights) {
				if (documentRights.value.includes(value)) {
					return true;
				}
			}

			return false;
		} else {
			throw new Error('Неверный тип прав доступа');
		}
	};

	/**
	 * @description Проверяет документ ЭСЗ на наличие указанных статусов
	 * 
	 * @param {number|number[]} statuses 
	 * @returns {boolean}
	 */
	const checkDocumentStatus = (statuses) => {
		if (!document.value) {
			return false;
		}

		if (Array.isArray(statuses)) {
			return statuses.includes(document.value.status_id);
		} else if (typeof statuses === 'number') {
			return document.value.status_id === statuses;
		} else {
			throw new Error('Неверный формат статуса документа');
		}
	};

	/**
	 * @param {number} documentId
	 * @returns {Promise<void>}
	 */
	const sendToApproval = async (documentId) => {
		try {
			loading.value = true;
			document.value = await ESZRepo.sendToApproval(documentId);
		}
		catch (e) {
			notify.fetchError(e.message);
			throw e;
		} finally {
			loading.value = false;
		}
	};

	/**
	 * 
	 * @param {number} documentId
	 * @returns {Promise<void>}
	 */
	const sendToSignatory = async (documentId) => {
		try {
			loading.value = true;
			document.value = await ESZRepo.sendToSignatory(documentId);
		}
		catch (e) {
			notify.fetchError(e.message);
			throw e;
		} finally {
			loading.value = false;
		}
	};

	return {
		document,
		loading,
		initDocument,
		updateDocument,
		remove,
		cancel,
		checkDocumentRights,
		getRights,
		checkDocumentStatus,
		sendToApproval,
		sendToSignatory,
	};
};