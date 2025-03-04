import { BaseRepository } from "./BaseRepository";

export class StaticRoleRepository extends BaseRepository {
	constructor() {
		super('roles', 'v1');
	}

	/**
	 * @returns {URL} 
	 */
	_buildUrl(nestedEndpoint) {
		return new URL(`${this._url}/${this._endpoint}/${this._version}` + (nestedEndpoint ? `/${nestedEndpoint}` : ''));
	}

	/**
	 * @param {string} q
	 * @return {Promise<any>}
	 */
	async search(q) {
		const result = await this._query({
			payload: { q },
			nestedEndpoint: 'statics/search-v2'
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
	 * @param {string} id
	 * @return {Promise<any>}
	 */
	async getUsersByRoleId(id) {
		const result = await this._query({
			payload: { id },
			nestedEndpoint: 'statics/get-users-by-role-id'
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
	 * @return {Promise<any>}
	 */
	async getTree() {
		const result = await this._query({
			payload: { id },
			nestedEndpoint: 'statics/get-tree'
		});

		if (!result.success)
			throw new Error(result.message);

		return result.data;
	}

	/**
	 * @param {number} id
	 * @return {Promise<any>}
	 */
	async getLazyTree(id) {
		const result = await this._query({
			payload: { id },
			nestedEndpoint: 'statics/get-lazy-tree'
		});

		if (!result.success)
			throw new Error(result.message);

		return result.data;
	}

	async searchTreeStaticRole(query) {
		const result = await this._query({
			payload: { query },
			nestedEndpoint: 'statics/search-lazy-tree',
		});

		if (!result.success)
			throw new Error(result.message);

		return result.data;
	}

	/**
	 * @param {number} id
	 * @return {Promise<any>}
	 */
	async getById(id) {
		const result = await this._query({
			payload: { id },
			nestedEndpoint: 'statics/get'
		});

		if (!result.success)
			throw new Error(result.message);

		return result.data;
	}
}