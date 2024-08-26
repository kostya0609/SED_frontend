import { ref } from "vue";
import { notify } from "@common/shared/utils";

import { PartitionRepo } from "@document-routes/partition/entities/partition";

const loading = ref(false);

const partition = ref(null);
const partitionsTree = ref(null);


export const usePartition = () => {

	const initPartition = async (id) => {
		try {
			loading.value = true;
			partition.value = await PartitionRepo.get({id});
		} catch (e) {
			notify.fetchError(e.message);
			throw e;
		} finally {
			loading.value = false;
		}
	};

	const updatePartition = async () => {
		try {
			if (!partition.value || !partition.value.id) throw new Error('Для обновления раздела необходимо сначала вызвать функцию initPartition');
			loading.value = true;
			partition.value = await PartitionRepo.get({ id: partition.value.id });		
		} catch (e) {
			notify.fetchError(e.message);
			throw e;
		} finally {
			loading.value = false;
		}
	};

	const initPartitionsTree = async () => {
		try {
			loading.value = true;
			partitionsTree.value = await PartitionRepo.getTree({});
		} catch (e) {
			notify.fetchError(e.message);
			throw e;
		} finally {
			loading.value = false;
		}
	};

	return {
		loading,

		partition,
		initPartition,
		updatePartition,
		
		partitionsTree,
		initPartitionsTree
	};
};