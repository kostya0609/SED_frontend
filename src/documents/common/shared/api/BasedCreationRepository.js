import { BaseRepository } from "@common/shared/api/BaseRepository";

export class BasedCreationRepository extends BaseRepository {
	constructor() {
		super();
		this.setModule('sed');
		this.setSubmodule('documents');
		this.setEndpoint('based-creation');
	}

	async createForm(payload) {
		const result = await this._query({
			payload,
			nestedEndpoint: 'create-from'
		});
		this._handleError(result);
		return result.data;
	}
}