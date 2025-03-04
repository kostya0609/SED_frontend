import { ref } from "vue";
import { notify } from "@common/shared/utils";

import { PartitionRepo } from "@document-routes/document-route/entities/partition";

const loading = ref(false);
const partitionsTree = ref(null);
const breadcrumbs = ref([]);

export const usePartitionTree = () => {
	const initPartitionsTree = async () => {
		try {
			loading.value = true;
			return partitionsTree.value = await PartitionRepo.getTree({});
		} catch (e) {
			notify.fetchError(e.message);
			throw e;
		} finally {
			loading.value = false;
		}
	};

	/**
	 * @typedef {object} Payload
	 * @property {string} Payload.title
	 * @property {number} Payload.parent_id
	 * 
	 * @param {Payload} payload
	 */
	const createPartition = async (payload) => {
		try {
			loading.value = true;
			await PartitionRepo.create(payload);
		} catch (e) {
			notify.fetchError(e.message);
			throw e;
		} finally {
			loading.value = false;
		}
	};

	/**
	 * @typedef {object} Payload
	 * @property {number} Payload.id
	 * @property {?string} Payload.title
	 * @property {?number} Payload.parent_id
	 * 
	 * @param {Payload} payload 
	 */
	const editPartition = async (payload) => {
		try {
			loading.value = true;
			await PartitionRepo.edit(payload);
		} catch (e) {
			notify.fetchError(e.message);
			throw e;
		} finally {
			loading.value = false;
		}
	};

	/**
	 * @param {{ id: number }} payload
	 */
	const deletePartition = async (payload) => {
		try {
			loading.value = true;
			await PartitionRepo.delete(payload);
		} catch (e) {
			notify.fetchError(e.message);
			throw e;
		} finally {
			loading.value = false;
		}
	};

	/**
	 * @param {{ id: number }} payload
	 */
		const getBreadcrumbs = async (payload) => {
			
			try {
				loading.value = true;
				return breadcrumbs.value = await PartitionRepo.getBreadcrumbs(payload);;
				
			} catch (e) {
				notify.fetchError(e.message);
				throw e;
			} finally {
				loading.value = false;
			}
		};

	const getTreeForSelectTemplate = async () => {
		try {
			loading.value = true;
			return await PartitionRepo.getTreeForSelectTemplate();
		} catch (e) {
			notify.fetchError(e.message);
			throw e;
		} finally {
			loading.value = false;
		}
	};

	return {
		loading,
		partitionsTree,
		breadcrumbs,
		initPartitionsTree,
		createPartition,
		editPartition,
		deletePartition,
		getTreeForSelectTemplate,
		getBreadcrumbs,
	};
};