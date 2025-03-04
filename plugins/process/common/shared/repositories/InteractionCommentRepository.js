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

		if (!result.success) {
			if (result.errors) {
				throw new Error(Object.values(result.errors).join('\n'));
			}

			throw new Error(result.message);
		}

		return result.data;
	}

	/**
	 * @param {{ document_id: number, template_id: number, user_id: number }} payload
	 * @returns {Promise<any[]>}
	 */
	async getComments(payload) {
		const result = await this._query({
			payload,
			nestedEndpoint: 'get-comments',
		});

		if (!result.success) {
			if (result.errors) {
				throw new Error(Object.values(result.errors).join('\n'));
			}

			throw new Error(result.message);
		}

		return result.data;
	}

	async decide(payload) {
		const result = await this._query({
			payload,
			nestedEndpoint: 'decide-v2',
		});

		if (!result.success) {
			if (result.errors) {
				throw new Error(Object.values(result.errors).join('\n'));
			}

			throw new Error(result.message);
		}

		return result.data;
	}
}