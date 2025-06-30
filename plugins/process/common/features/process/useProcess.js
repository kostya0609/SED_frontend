import { inject } from 'vue';
import { useActiveProcess } from '@/plugins/process/common';
import { useProcessProvider } from '@/plugins/process/common';


export const useProcess = () => {
	const { initActiveProcess } = useActiveProcess();
	const { documentId, templateId } = useProcessProvider();

	const reloadProcess = async () => {
		await initActiveProcess(documentId.value, templateId.value);
	};

	/**
	 * Проверяет пользователя на участие в процессах документа
	 * @param {number} user_id 
	 * @returns {Promise<boolean>}
	 */
	const checkParticipant = async (user_id) => {
		const { ParticipantRepo } = inject('useRepo');

		return await ParticipantRepo.checkParticipant({
			user_id,
			document_id: documentId.value,
			template_id: templateId.value,
		});
	};

	return {
		reloadProcess,
		checkParticipant,
	};
};