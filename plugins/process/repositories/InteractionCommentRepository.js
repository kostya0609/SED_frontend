import { BaseRepository } from "./BaseRepository";

export class InteractionCommentRepository extends BaseRepository {

	constructor() {
		super();
		this
			.setModule('processes')
			.setSubmodule('interaction')
			.setEndpoint('comments');
	}

	/**
	 * @param {{process_id: number}} payload
	 * @return {Promise<any>}
	 */
	async getByProcessId(payload) {
		const result = await this._query({
			payload,
			nestedEndpoint: 'list',
		});

		if (!result.success)
			throw new Error(result.message);

		return result.data;
	}

	/**
	 * 
	 * @param {{module_name: string, document_id: number}} payload 
	 * @returns {Promise<any>}
	 */
	async getByModuleName(payload) {
		const result = await this._query({
			payload,
			nestedEndpoint: 'list-by-module',
		});

		if (!result.success)
			throw new Error(result.message);

		return result.data;
	}

	async decide(payload) {
		const result = await this._query({
			payload,
			nestedEndpoint: 'decide',
		});

		if (!result.success)
			throw new Error(result.message);

		return result.data;
	}
}