import { BaseRepository } from "./BaseRepository";

export class ProcessRepository extends BaseRepository {
	constructor() {
		super();
		this
			.setModule('processes')
			.setSubmodule('public')
			.setEndpoint('processes');
	}

	/**
	 * @param {Object} payload
	 * @return {Promise<any>}
	 */
	async get(payload) {
		const result = await this._query({
			payload,
			nestedEndpoint: 'get',
		});

		if (!result.success) {
			if (result.errors) {
				throw new Error(Object.values(result.errors).join('\n'));
			}

			throw new Error(result.message);
		}

		return result.data;
	}

	/**
	 * @param {{
	 * process_id: number
	 * }} payload
	 * @return {Promise<any>}
	 */
	async getActiveStages(payload) {
		const result = await this._query({
			payload,
			nestedEndpoint: 'get-active-stages'
		});

		if (!result.success) {
			if (result.errors) {
				throw new Error(Object.values(result.errors).join('\n'));
			}

			throw new Error(result.message);
		}

		return result.data;
	}


	/**
	 * @param {{
	 * process_id: number
	 * user_id: number
	 * }} payload
	 * @return {Promise<any>}
	 */
	async run(payload) {
		const result = await this._query({
			payload,
			nestedEndpoint: 'run',
		});

		if (!result.success) {
			if (result.errors) {
				throw new Error(Object.values(result.errors).join('\n'));
			}

			throw new Error(result.message);
		}

		return result.data;
	}

	/**
	 * @param {{
	* process_id: number
	* user_id: number
	* }} payload
	* @return {Promise<any>}
	*/
	async runAndValidatePreparationGroups(payload) {
		const result = await this._query({
			payload,
			nestedEndpoint: 'run-and-validate-preparation-groups',
		});

		if (!result.success) {
			if (result.errors) {
				throw new Error(Object.values(result.errors).join('\n'));
			}

			throw new Error(result.message);
		}

		return result.data;
	}

	/**
	 * @param {Object} payload
	 * @return {Promise<any>}
	 */
	async cancellation(payload) {
		const result = await this._query({
			payload,
			nestedEndpoint: 'cancellation',
		});

		if (!result.success) {
			if (result.errors) {
				throw new Error(Object.values(result.errors).join('\n'));
			}

			throw new Error(result.message);
		}

		return result.data;
	}


	/**
	 * @param {{
	 * process_id: number
	 * user_id: number
	 * }} payload
	 * @return {Promise<any>}
	 */
	async delete(payload) {
		const result = await this._query({
			payload,
			nestedEndpoint: 'delete',
		});

		if (!result.success) {
			if (result.errors) {
				throw new Error(Object.values(result.errors).join('\n'));
			}

			throw new Error(result.message);
		}

		return result.data;
	}

	/**
	 * @param {{
	 * user_id: number
	 * document_id: number
	 * template_id: number
	 * }} payload
	 * @return {Promise<any>}
	 */
	async rebuild(payload) {
		const result = await this._query({
			payload,
			nestedEndpoint: 'rebuild',
		});

		if (!result.success) {
			if (result.errors) {
				throw new Error(Object.values(result.errors).join('\n'));
			}

			throw new Error(result.message);
		}

		return result.data;
	}

	/**
	 * @param {{
	* user_id: number
	* document_id: number
	* template_id: number
	* }} payload
	* @return {Promise<any>}
	*/
	async create(payload) {
		const result = await this._query({
			payload,
			nestedEndpoint: 'create',
		});

		if (!result.success) {
			if (result.errors) {
				throw new Error(Object.values(result.errors).join('\n'));
			}

			throw new Error(result.message);
		}

		return result.data;
	}

	/**
	 * @param {{
	* document_id: number
	* template_id: number
	* user_id: number
	* }} payload
	* @return {Promise<any>}
	*/
	async deactivateCompletedProcess(payload) {
		const result = await this._query({
			payload,
			nestedEndpoint: 'deactivate-completed-process',
		});

		if (!result.success) {
			if (result.errors) {
				throw new Error(Object.values(result.errors).join('\n'));
			}

			throw new Error(result.message);
		}

		return result.data;
	}

	/**
	 * @param {{
	* process_id: number
	* }} payload
	* @return {Promise<any>}
	*/
	async getUsersFromActiveStage(payload) {
		const result = await this._query({
			payload,
			nestedEndpoint: 'get-users-from-active-stage',
		});

		if (!result.success) {
			if (result.errors) {
				throw new Error(Object.values(result.errors).join('\n'));
			}

			throw new Error(result.message);
		}

		return result.data;
	}

	/**
	 * @param {{
	* process_id: number
	* }} payload
	* @return {Promise<any>}
	*/
	async getParticipantsFromActiveStage(payload) {
		const result = await this._query({
			payload,
			nestedEndpoint: 'get-participants-from-active-stage',
		});

		if (!result.success) {
			if (result.errors) {
				throw new Error(Object.values(result.errors).join('\n'));
			}

			throw new Error(result.message);
		}

		return result.data;
	}

	/**
	 * @param {{
	* process_id: number
	* user_id: number
	* }} payload
	* @return {Promise<any>}
	*/
	async isParticipantInActiveGroup(payload) {
		const result = await this._query({
			payload,
			nestedEndpoint: 'is-participant-in-active-group',
		});

		if (!result.success) {
			if (result.errors) {
				throw new Error(Object.values(result.errors).join('\n'));
			}

			throw new Error(result.message);
		}

		return result.data || false;
	}

}
