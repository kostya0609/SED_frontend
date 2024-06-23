import { ref } from "vue";
import { notify } from "@common/shared/utils";
import { DirectiveRepo } from "@documents/directive/entities/directive/api";

const document = ref(null);
const loading = ref(false);

export const useDocument = () => {

	/**
	* @param {number} document_id
	*/
	const initDocument = async (document_id) => {
		try {
			loading.value = true;
			const result = await DirectiveRepo.getById({ document_id });

			document.value = result;

		} catch (e) {
			notify.fetchError(e.message);
			throw e;
		} finally {
			loading.value = false;
		}
	};

	const updateDocument = async () => {
		try {
			if (!document.value || !document.value.id) throw new Error('Для обновления документа необходимо сначала вызвать функцию initDocument');

			loading.value = true;
			const result = await DirectiveRepo.getById({ document_id: document.value.id });

			document.value = result;

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
			await DirectiveRepo.delete({ document_id });
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
			const directive = await DirectiveRepo.cancel({ document_id });
			document.value = directive;
		} catch (e) {
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
		cancel,
		remove,
	}
}