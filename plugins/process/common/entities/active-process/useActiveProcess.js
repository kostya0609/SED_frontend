import { inject, ref } from 'vue';
import { ActiveProcess } from './ActiveProcess';
import { notify } from '@/plugins/process/common';


/**
 * @type {import('vue').Ref<ActiveProcess|null>}
 */
const activeProcess = ref(null);

/**
 * @type {import('vue').Ref<boolean>}
 */
const loading = ref(false);

export const useActiveProcess = () => {
	const { ProcessRepo, ParticipantRepo } = inject('useRepo');

	/**
	 * @param {object} process
	 * @returns {ActiveProcess}
	 */
	const createActiveProcess = (process) => {
		return new ActiveProcess(process);
	};

	/**
	 * @param {?number} document_id
	 * @param {?number} template_id
	 * 
	 * @returns {Promise<@import('vue').Ref<ActiveProcess>>}
	 */
	const initActiveProcess = async (document_id, template_id) => {
		try {
			loading.value = true;

			const result = await ProcessRepo.get({
				document_id,
				template_id,
			});

			const _activeProcess = createActiveProcess(result);
			activeProcess.value = _activeProcess;

			return activeProcess;
		} catch (e) {
			notify.fetchError(e.message);
			throw e;
		} finally {
			loading.value = false;
		}
	};

	/**
	 * @typedef {object} CreateProcessDto
	 * @property {number} CreateProcessDto.user_id
	 * @property {number} CreateProcessDto.document_id
	 * @property {number} CreateProcessDto.template_id
	 * @property {number} CreateProcessDto.document_user_id
	 * 
	 * @param {CreateProcessDto}
	 * 
	 * @returns {Promise<@import('vue').Ref<ActiveProcess>>}
	 */
	const createProcess = async ({ document_id, document_user_id, template_id, user_id }) => {
		const result = await ProcessRepo.create({
			user_id,
			document_id,
			template_id,
			document_user_id,
		});

		const _activeProcess = createActiveProcess(result);
		activeProcess.value = _activeProcess;

		return activeProcess;
	};

	/**
	 * @param {number} document_id
	 * @param {number} template_id
	 * 
	 * @returns {Promise<@import('vue').Ref<ActiveProcess>>}
	 */
	const deactivateCompletedProcess = async (document_id, template_id, user_id) => {
		const result = await ProcessRepo.deactivateCompletedProcess({
			document_id,
			template_id,
			user_id,
		});

		const _activeProcess = createActiveProcess(result);
		activeProcess.value = _activeProcess;

		return activeProcess;
	};

	/**
	 * @param {number} process_id 
	 * @param {number} user_id 
	 * 
	 * @returns {Promise<@import('vue').Ref<ActiveProcess>>}
	 */
	const cancellationProcess = async (process_id, user_id, comment) => {
		const result = await ProcessRepo.cancellation({
			process_id,
			user_id,
			comment,
		});

		const _activeProcess = createActiveProcess(result);
		activeProcess.value = _activeProcess;

		return activeProcess;
	};

	/**
	 * 
	 * @param {number} process_id 
	 * 
	 * @returns {Promise<@import('vue').Ref<ActiveProcess>>}
	 */
	const deleteProcess = async (process_id, user_id) => {
		const result = await ProcessRepo.delete({ process_id, user_id });

		const _activeProcess = createActiveProcess(result);
		activeProcess.value = _activeProcess;

		return activeProcess;
	};

	/**
	 * @typedef {object} RebuildProcessDto
	 * @property {number} RebuildProcessDto.user_id
	 * @property {number} RebuildProcessDto.document_id
	 * @property {number} RebuildProcessDto.template_id
	 * @property {number} RebuildProcessDto.document_user_id
	 * 
	 * @param {RebuildProcessDto}
	 * 
	 * @returns {Promise<@import('vue').Ref<ActiveProcess>>}
	 */
	const rebuildProcess = async ({ user_id, document_id, template_id, document_user_id }) => {
		const result = await ProcessRepo.rebuild({
			user_id,
			document_id,
			template_id,
			document_user_id,
		});

		const _activeProcess = createActiveProcess(result);
		activeProcess.value = _activeProcess;

		return activeProcess;
	};

	/**
	 * 
	 * @param {number} process_id
	 * @param {number} user_id
	 * 
	 * @returns {Promise<@import('vue').Ref<ActiveProcess>>}
	 */
	const runProcess = async (process_id, user_id) => {
		const result = await ProcessRepo.runAndValidatePreparationGroups({ process_id, user_id });

		const _activeProcess = createActiveProcess(result);
		activeProcess.value = _activeProcess;

		return activeProcess;
	};

	/**
	 * @param {FormData} payload 
	 * @returns {Promise<ActiveProcess>}
	 */
	const decide = async (payload) => {
		const _activeProcess = await ParticipantRepo.decide(payload);
		return new ActiveProcess(_activeProcess);
	};

	const getCountParticipants = () => {
		let participantCount = 0;

		if (!activeProcess.value.isCreated()) {
			return 0;
		}

		activeProcess.value.process.stages.forEach(stage => {
			stage.groups.forEach(group => {
				participantCount += group.preparation_participants.length;
			});
		});

		return participantCount;
	};

	return {
		activeProcess,
		loading,

		createActiveProcess,
		initActiveProcess,
		createProcess,
		deactivateCompletedProcess,
		cancellationProcess,
		deleteProcess,
		rebuildProcess,
		runProcess,
		decide,
		getCountParticipants,
	};
};