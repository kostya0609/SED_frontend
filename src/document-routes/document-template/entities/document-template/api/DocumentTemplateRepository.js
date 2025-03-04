import { BaseRepository } from "@common/shared/api/BaseRepository";

export class DocumentTemplateRepository extends BaseRepository {
	constructor() {
		super();
		this.setSubmodule('document-routes');
		this.setEndpoint('document-templates');
	}

	/**
	 * @param {string} nestedEndpoint
	 * @returns {module:url.URL}
	 */
	_buildUrl(nestedEndpoint) {
		return new URL(`${this._url}/${this._endpoint}/${this._version}` + (nestedEndpoint ? `/${nestedEndpoint}` : ''));
	}

	/**
	 * @param {{
	 * user_id: number,
	 * title: string,
	 * parent_id: number,
	 * route_id: number,
	 * type_id: number,
	 * data: object,
	 * is_start: boolean,
	 * is_active: boolean,
	 * requirements: string
	 * }} payload
	 * @return {Promise<any>}
	 */
	async create(payload) {
		const result = await this._query({
			payload,
			nestedEndpoint: 'create'
		});
		this._handleError(result);
		return result.data;
	}

	/**
	 * @param {{
	 * id: number,
	 * user_id: number,
	 * title: string,
	 * parent_id: number,
	 * route_id: number,
	 * type_id: number,
	 * data: object,
	 * is_start: boolean,
	 * is_active: boolean,
	 * requirements: string
	 * }} payload
	 * @return {Promise<any>}
	 */
	async edit(payload) {
		const result = await this._query({
			payload,
			nestedEndpoint: 'edit'
		});
		this._handleError(result);
		return result.data;
	}

	/**
	 * @param {{user_id: number, id: number}} payload
	 * @return {Promise<any>}
	 */
	async get(payload) {
		const result = await this._query({
			payload,
			nestedEndpoint: 'get'
		});
		this._handleError(result);
		return result.data;
	}

	/**
	 * @param {{user_id: number, route_id: number}} payload
	 * @return {Promise<any>}
	 */
	async list(payload) {
		const result = await this._query({
			payload,
			nestedEndpoint: 'list'
		});
		this._handleError(result);
		return result.data;
	}

	/**
	 * @param {{user_id: number, id: number}} payload
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
	 * @param {{user_id: number, id: number}} payload
	 * @return {Promise<any>}
	 */
	async deactivate(payload) {
		const result = await this._query({
			payload,
			nestedEndpoint: 'deactivate'
		});
		this._handleError(result);
		return result.data;
	}

	/**
	 * @param {{id: number, requirements: string}} payload
	 * @return {Promise<any>}
	 */
	async updateRequirements(payload) {
		const result = await this._query({
			payload,
			nestedEndpoint: 'update-requirements'
		});
		this._handleError(result);
		return result.data;
	}

	/**
	 * @param {number} role_id 
	 * @returns {Promise<any[]>}
	 */
	async getDocumentsByStaticRole(role_id) {
		const result = await this._query({
			payload: { role_id },
			nestedEndpoint: 'get-by-static-role'
		});
		this._handleError(result);
		return result.data;
	}

	/**
	 * @param {number} role_id 
	 * @returns {Promise<any[]>}
	 */
	async getDocumentsByDynamicRole(role_id) {
		const result = await this._query({
			payload: { role_id },
			nestedEndpoint: 'get-by-dynamic-role'
		});
		this._handleError(result);
		return result.data;
	}
}