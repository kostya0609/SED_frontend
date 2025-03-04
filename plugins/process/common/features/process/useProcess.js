import { useActiveProcess } from '@/plugins/process/common';
import { useProcessProvider } from '@/plugins/process/common';


export const useProcess = () => {
	const { initActiveProcess } = useActiveProcess();
	const { documentId, templateId } = useProcessProvider();
	
	const reloadProcess = async () => {
		await initActiveProcess(documentId.value, templateId.value);
	};

	return {
		reloadProcess,
	};
};