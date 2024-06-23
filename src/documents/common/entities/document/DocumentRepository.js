import { BaseRepository } from '@/common/shared/api';

export class DocumentRepository extends BaseRepository {
	constructor() {
		super();
		this.setSubmodule('documents');
	}

	/**
	*  @param {import('@/common/shared/types/repository').FilterDTO} payload
	*  @return {Promise<any>}
	*/
	async getAll(payload) {
		const result = await this._query({
			payload,
			nestedEndpoint: 'documents/list',
		});

		if (!result.success)
			throw new Error(result.message);

		return result.data;
	}

	/**
	*  @param {import('@/common/shared/types/repository').FilterDTO} payload
	*  @return {Promise<any>}
	*/
	async getNeedAction(payload) {

		const result = await this._query({
			payload,
			nestedEndpoint: 'documents/list',
			//nestedEndpoint: 'documents/need-action-list',
		});

		if (!result.success)
			throw new Error(result.message);

		return result.data;
	}

	/**
	 * @param {{documentId: number}} payload
	 * @return {Promise<any>}
	 */
	async delete(payload) {
		const result = await this._query({
			payload,
			nestedEndpoint: 'documents/delete',
		});

		if (!result.success)
			throw new Error(result.message);

		return result;
	}

	/**
	 * @return {Promise<number>}
	 */
	async getNeedActionCount() {
		const result = await this._query({
			nestedEndpoint: 'documents/need-action-count',
			payload: {
				/** TODO: Костыль для того, чтобы передать id пользователя. В базовом методе _query некорректно реализована логика проверки payload */
				user_id: window._userId
			}
		});

		if (!result.success)
			throw new Error(result.message);

		return result.data.count;
	}
}