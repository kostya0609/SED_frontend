import { BaseRepository } from "@common/shared/api/BaseRepository.js";

export class GridRepository extends BaseRepository {
	constructor() {
		super();
		this.setModule('grid');
		this.setEndpoint('filter/preset/default');
	}

	/**
	 * @param {string} nestedEndpoint 
	 * @returns {URL}
	 */
	_buildUrl(nestedEndpoint) {
		return new URL(`${this._url}/${this._module}/${this._endpoint ? this._endpoint : ''}` + (nestedEndpoint ? `/${nestedEndpoint}` : ''));
	}

	/**
	 * @param {Object} payload
	 * @return {Promise<any>}
	 */
	async loadFilter(payload) {
		const result = await this._query({
			payload,
			nestedEndpoint: 'add',
		});

		if (result.status !== 'success')
			throw new Error(result.message);

		return result;
	}

}