import { BaseRepository } from "@/common/shared/api";

export class AutomationRepository extends BaseRepository {
	constructor() {
		super();
		this.setSubmodule('document-routes');
		this.setEndpoint('automations');
	}

	/**
	 * @param {string} nestedEndpoint
	 * @returns {URL}
	 */
	_buildUrl(nestedEndpoint) {
		return new URL(`${this._url}/${this._endpoint}/${this._version}` + (nestedEndpoint ? `/${nestedEndpoint}` : ''));
	}

	/**
	 * @param {any} payload
	 * @returns {Promise<any>}
	 */
	async getAll(payload) {
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
	 * @typedef {object} Payload
	 * @property {number} Payload.id
	 * @property {number} Payload.tmp_doc_id
	 * @property {boolean} Payload.is_active
	 * @param {Payload} payload
	 * 
	 * @returns {Promise<void>}
	 */
	async updateIsActive(payload) {
		const result = await this._query({
			payload,
			nestedEndpoint: 'update-is-active'
		});
		if (!result.success) {
			if (result.errors) {
				throw new Error(Object.values(result.errors).join('\n'));
			}

			throw new Error(result.message);
		}
	}
}