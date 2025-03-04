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
		this._handleError(result);
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
	async preCreate(payload) {
		const result = await this._query({
			payload,
			nestedEndpoint: 'pre-create'
		});
		this._handleError(result);
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
		this._handleError(result);
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
		this._handleError(result);
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
		this._handleError(result);
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
		this._handleError(result);
		return result.data;
	}

	/**
	 * @param {{ document_id: number }} payload
	 * @returns {Promise<any>}
	 */
	async sendToApproval(payload) {
		const result = await this._query({
			payload,
			nestedEndpoint: 'send-to-approval'
		});
		this._handleError(result);
		return result.data;
	}
}