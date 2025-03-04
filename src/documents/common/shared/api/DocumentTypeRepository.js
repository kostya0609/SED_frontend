import { BaseRepository } from "@common/shared/api/BaseRepository";

export class DocumentTypeRepository extends BaseRepository {
	constructor() {
		super();
		this.setModule('sed');
		this.setSubmodule('documents');
		this.setEndpoint('types');
	}

	async list(payload) {
		const result = await this._query({
			payload,
			nestedEndpoint: 'list'
		});
		this._handleError(result);
		return result.data;
	}
}