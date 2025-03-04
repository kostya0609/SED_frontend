import { BaseRepository } from "@common/shared/api/BaseRepository";

export class ESZRepository extends BaseRepository {
	constructor() {
		super();
		this.setSubmodule('documents/esz');
		this.setEndpoint('esz');
	}

	async getById(payload) {
		const result = await this._query({
			payload,
			nestedEndpoint: 'get'
		});
		this._handleError(result);
		return result.data;
	}

	async preCreate(payload) {
		const result = await this._query({
			payload,
			nestedEndpoint: 'pre-create',
		});
		this._handleError(result);
		return result.data;
	}

	async update(payload) {
		const result = await this._query({
			payload,
			nestedEndpoint: 'update'
		});
		this._handleError(result);
		return result.data;
	}

	async delete(payload) {
		const result = await this._query({
			payload,
			nestedEndpoint: 'delete'
		});
		this._handleError(result);
		return result.data;
	}

	async uploadFiles(payload) {
		const result = await this._query({
			payload,
			nestedEndpoint: 'upload-files',
		});
		this._handleError(result);
		return result.data;
	}

	async sendToApproval(documentId) {
		const result = await this._query({
			payload: { document_id: documentId },
			nestedEndpoint: 'send-to-approval',
		});
		this._handleError(result);
		return result.data;
	}

	async cancellation(documentId) {
		const result = await this._query({
			payload: { document_id: documentId },
			nestedEndpoint: 'cancellation',
		});
		this._handleError(result);
		return result.data;
	}

	async sendToSignatory(documentId) {
		const result = await this._query({
			payload: { document_id: documentId },
			nestedEndpoint: 'send-to-signatory',
		});
		this._handleError(result);
		return result.data;
	}
}