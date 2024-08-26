import { BaseRepository } from "@common/shared/api/BaseRepository";

export class ESZRepository extends BaseRepository {
	constructor() {
		super();
		this.setSubmodule('documents/esz');
		this.setEndpoint('esz');
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

		if (!result.success) {
			if (result.errors) {
				throw new Error(Object.values(result.errors).join('\n'));
			}

			throw new Error(result.message);
		}

		return result.data;
	}


	/**
	 * @typedef {object} CreateEszDto
	 * 
	 * @property {number} CreateEszDto.theme_id
	 * @property {string} CreateEszDto.content
	 * @property {string} CreateEszDto.portfolio
	 * @property {number} CreateEszDto.initiator_id
	 * @property {number} CreateEszDto.signatory_id
	 * @property {number[]} CreateEszDto.receivers
	 * @property {number[]} CreateEszDto.observers
	 * 
	 * @param {CreateEszDto} payload
	 * @return {Promise<any>}
	 */
	async create(payload) {
		const result = await this._query({
			payload,
			nestedEndpoint: 'create'
		});

		if (!result.success) {
			if (result.errors) {
				throw new Error(Object.values(result.errors).join(' '));
			}

			throw new Error(result.message);
		}



		return result.data;
	}


	/**
	 * @typedef {object} UpdateEszDto
	 * 
	 * @property {number} UpdateEszDto.document_id
	 * @property {number} UpdateEszDto.theme_id
	 * @property {string} UpdateEszDto.content
	 * @property {string} UpdateEszDto.portfolio
	 * @property {number} UpdateEszDto.initiator_id
	 * @property {number} UpdateEszDto.signatory_id
	 * @property {number[]} UpdateEszDto.receivers
	 * @property {number[]} UpdateEszDto.observers
	 * 
	 * @param {UpdateEszDto} payload
	 * @return {Promise<any>}
	 */
	async update(payload) {
		const result = await this._query({
			payload,
			nestedEndpoint: 'update'
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
	  * @param {{document_id: number}} payload
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
	  * @param {FormData} payload
	  * @return {Promise<any>}
	  */
	async uploadFiles(payload) {
		const result = await this._query({
			payload,
			nestedEndpoint: 'upload-files',
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
	 * @param {number} documentId 
	 * @returns {Promise<void>}
	 */
	async sendToApproval(documentId) {
		const result = await this._query({
			payload: { document_id: documentId },
			nestedEndpoint: 'send-to-approval',
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
	 * @param {number} documentId 
	 * @returns {Promise<any>}
	 */
	async cancellation(documentId) {
		const result = await this._query({
			payload: { document_id: documentId },
			nestedEndpoint: 'cancellation',
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