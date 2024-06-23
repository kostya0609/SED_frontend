import { BaseRepository } from '@/common/shared/api';

export class DocumentTypeRepository extends BaseRepository {
	constructor() {
		super();
		this.setSubmodule('documents');
	}

	
	async getAll() {
		const result = await this._query({
			nestedEndpoint: 'types/list',
		});

		if (!result.success)
			throw new Error(result.message);

		return result.data;
	}

}