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
		if (!result.success) {
			if (result.errors) {
				throw new Error(Object.values(result.errors).join('\n'));
			}

			throw new Error(result.message);
		}

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
		if (!result.success) {
			if (result.errors) {
				throw new Error(Object.values(result.errors).join('\n'));
			}

			throw new Error(result.message);
		}

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
		if (!result.success) {
			if (result.errors) {
				throw new Error(Object.values(result.errors).join('\n'));
			}

			throw new Error(result.message);
		}

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
		if (!result.success) {
			if (result.errors) {
				throw new Error(Object.values(result.errors).join('\n'));
			}

			throw new Error(result.message);
		}

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
		if (!result.success) {
			if (result.errors) {
				throw new Error(Object.values(result.errors).join('\n'));
			}

			throw new Error(result.message);
		}

		return result.data;
	}
}