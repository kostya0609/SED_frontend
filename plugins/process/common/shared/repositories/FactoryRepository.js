import { BaseRepository } from "./BaseRepository";

export class FactoryRepository extends BaseRepository {
	constructor() {
		super();
		this
			.setModule('processes')
			.setSubmodule('factory')
			.setEndpoint('settings');
	}

	/**
	 * @return {Promise<any>}
	 */
	async getAll() {
		const result = await this._query({
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
}
