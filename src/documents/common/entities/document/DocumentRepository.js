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
			nestedEndpoint: 'documents/list-v2',
		});
		this._handleError(result);
		return result.data;
	}

	/**
	*  @param {import('@/common/shared/types/repository').FilterDTO} payload
	*  @return {Promise<any>}
	*/
	async getNeedAction(payload) {
		const result = await this._query({
			payload,
			nestedEndpoint: 'documents/need-action-list-v2',
		});
		this._handleError(result);
		return result.data;
	}

	/**
	*  @param {import('@/common/shared/types/repository').FilterDTO} payload
	*  @return {Promise<any>}
	*/
	async getNeedActionSubuser(payload) {
		const result = await this._query({
			payload,
			nestedEndpoint: 'documents/need-action-subuser-list-v2',
		});
		this._handleError(result);
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
		this._handleError(result);
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
		this._handleError(result);
		return result.data.count;
	}

	/**
	 * @return {Promise<number>}
	 */
	async getNeedActionSubuserCount() {
		const result = await this._query({
			nestedEndpoint: 'documents/need-action-subuser-count',
			payload: {
				/** TODO: Костыль для того, чтобы передать id пользователя. В базовом методе _query некорректно реализована логика проверки payload */
				user_id: window._userId
			}
		});
		this._handleError(result);
		return result.data.count;
	}

	/**
	 * @return {Promise<string>}
	 */
	async getAllStatuses() {
		const result = await this._query({
			nestedEndpoint: 'documents/get-all-statuses',
			payload: {
				/** TODO: Костыль для того, чтобы передать id пользователя. В базовом методе _query некорректно реализована логика проверки payload */
				user_id: window._userId
			}
		});
		this._handleError(result);
		return result.data;
	}
}