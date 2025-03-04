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
	 * @param {{ template_id: number, common_start_document_id: int}} payload 
	 * @returns {Promise<any[]>}
	 */
	async getTreeTemplates(payload) {
		const result = await this._query({
			payload,
			nestedEndpoint: 'get-tree-templates'
		});
		this._handleError(result);
		return result.data;
	}
}