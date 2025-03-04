import { BaseRepository } from "./BaseRepository";

export class TemplateRepository extends BaseRepository {

	constructor() {
		super();
		this
			.setModule('processes')
			.setSubmodule('public')
			.setEndpoint('processes');
	}


	/**
	 * @param {Object} payload
	 * @return Promise<any>
	 */
	async get(payload) {
		const result = await this._query({
			payload,
			nestedEndpoint: 'get'
		});

		if (!result.success) {
			if (result.errors) {
				throw new Error(Object.values(result.errors).join('\n'));
			}

			throw new Error(result.message);
		}

		return result;
	}


}
