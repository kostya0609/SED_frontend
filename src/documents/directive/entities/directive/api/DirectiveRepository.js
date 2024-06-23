import { BaseRepository } from "@common/shared/api/BaseRepository";

export class DirectiveRepository extends BaseRepository {
	constructor() {
		super();
		this.setSubmodule('documents/directive');
		this.setEndpoint('directives');
	}

	/**
	 * @param {string} nestedEndpoint
	 * @returns {module:url.URL}
	 */
	_buildUrl(nestedEndpoint) {
		return new URL(`${this._url}/${this._endpoint}/${this._version}` + (nestedEndpoint ? `/${nestedEndpoint}` : ''));
	}


	/**
	 * @param {{document_id: number}} payload
	 * @return {Promise<any>}
	 */
	async getById(payload) {
		const result = await this._query({
			payload,
			nestedEndpoint: 'get'
		});
		if (!result.success)
			throw new Error(result.errors ? Object.values(result.errors) : result.message);

		return result.data;
	}


	/**
	 * @param {{
	 *  theme_id: number,
	 *  content: string,
	 *  responsible_id: number,
	 *  receivers: number[]
	 * }} payload
	 * @return {Promise<any>}
	 */
	async create(payload) {
		const result = await this._query({
			payload,
			nestedEndpoint: 'create'
		});
		if (!result.success)
			throw new Error(result.errors ? Object.values(result.errors) : result.message);

		return result.data;
	}


	/**
	 * @param {{
	 * id: number,
	 *  theme_id: number,
	 *  content: string,
	 *  responsible_id: number,
	 *  receivers: number[]
	 * }} payload
	 * @return {Promise<any>}
	 */
	async update(payload) {
		const result = await this._query({
			payload,
			nestedEndpoint: 'update'
		});
		if (!result.success)
			throw new Error(result.errors ? Object.values(result.errors) : result.message);

		return result.data;
	}

	/**
	  * @param {{document_id: number}} payload
	  * @return {Promise<any>}
	  */
	async delete(payload) {
		const result = await this._query({
			payload,
			nestedEndpoint: 'delete'
		});
		if (!result.success)
			throw new Error(result.errors ? Object.values(result.errors) : result.message);

		return result.data;
	}

	/**
	  * @param {FormData} payload
	  * @return {Promise<any>}
	  */
	async uploadFiles(payload) {
		const result = await this._query({
			payload,
			nestedEndpoint: 'upload-files',
		});

		if (!result.success)
			throw new Error(result.errors ? Object.values(result.errors) : result.message);

		return result.data;
	}

	/**
	 * @param {{ document_id: number }} payload
	 * @returns {Promise<any>}
	 */
	async cancel(payload) {
		const result = await this._query({
			payload,
			nestedEndpoint: 'cancel'
		});
		if (!result.success)
			throw new Error(result.errors ? Object.values(result.errors) : result.message);

		return result.data;
	}


}