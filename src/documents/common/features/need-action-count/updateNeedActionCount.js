import { DocumentRepo } from "@documents/common/entities/document";
import { useCounter } from '@/plugins/menu';
import { notify } from "@common/shared/utils";

export const updateNeedActionCount = async () => {
	try {
		const { setCounter } = useCounter();
		const counter = await DocumentRepo.getNeedActionCount();

		setCounter(1, counter);
	} catch (e) {
		notify.fetchError(e.message);
		throw e;
	} finally {
	}
};