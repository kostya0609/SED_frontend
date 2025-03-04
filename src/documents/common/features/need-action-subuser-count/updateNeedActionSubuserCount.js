import { DocumentRepo } from "@documents/common/entities/document";
import { useCounter } from '@/plugins/menu';
import { notify } from "@common/shared/utils";

export const updateNeedActionSubuserCount = async () => {
	try {
		const { setCounter } = useCounter();
		const counter = await DocumentRepo.getNeedActionSubuserCount();

		setCounter(2, counter);
	} catch (e) {
		notify.fetchError(e.message);
		throw e;
	} finally {
	}
};