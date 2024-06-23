import { BaseRepository } from "./BaseRepository";

export class ParticipantRepository extends BaseRepository {
	constructor() {
		super();
		this
			.setModule('processes')
			.setSubmodule('public')
			.setEndpoint('processes/participants');
	}

	/**
	 * @param {Object} payload
	 * @return Promise<any>
	 */
	async attach(payload) {
		const result = await this._query({
			payload,
			nestedEndpoint: 'attach',
		});

		if (!result.success)
			throw new Error(result.message);

		return result.data;
	}

	/**
	 * @param {Object} payload
	 * @return Promise<any>
	 */
	async detach(payload) {
		const result = await this._query({
			payload,
			nestedEndpoint: 'detach',
		});

		if (!result.success)
			throw new Error(result.message);

		return result.data;
	}

	/**
	 * @param {{
	 * process_id: number
	 * participant_id: number
	 * action_id: number
	 * comment?: string
	 * }} payload
	 * @return Promise<any>
	 */
	async decide(payload) {
		const result = await this._query({
			payload,
			nestedEndpoint: 'decide',
		});

		if (!result.success)
			throw new Error(result.message);

		return result.data;
	}

	/**
	 * 
	 * @param {{
	 * files: File[]
	 * participant_id: number
	 * }} payload 
	 * @returns {Promise<any>}
	 */
	async uploadDecideFiles(payload) {
		const result = await this._query({
			payload,
			nestedEndpoint: 'upload-decide-files',
		});

		if (!result.success)
			throw new Error(result.message);

		return result;
	}

	/**
	 * @param {{
	 * process_id: number
	 * user_id: number
	 * }} payload
	 * @return {Promise<any>}
	 */
	async getActiveParticipant(payload) {
		const result = await this._query({
			payload,
			nestedEndpoint: 'get-active-participant',
		});

		if (!result.success)
			throw new Error(result.message);

		return result.data ? result.data : null;
	}


	/**
	 * Получает историю участников процесса
	 * 
	 * @param {{ template_id: number, document_id: number }} payload 
	 * @returns {Promise<any[]>}
	 */
	async getParticipantHistory(payload) {
		const result = await this._query({
			payload,
			nestedEndpoint: 'get-participant-history',
		});

		if (!result.success)
			throw new Error(result.message);

		return result.data;
	}

}
