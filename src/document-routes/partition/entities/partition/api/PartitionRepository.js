import { BaseRepository } from "@common/shared/api/BaseRepository";

export class PartitionRepository extends BaseRepository {
    constructor() {
        super();
        this.setSubmodule('document-routes');
        this.setEndpoint('partitions');
    }

    /**
     * @param {string} nestedEndpoint
     * @returns {module:url.URL}
     */
    _buildUrl(nestedEndpoint) {
        return new URL(`${this._url}/${this._endpoint}/${this._version}` + (nestedEndpoint ? `/${nestedEndpoint}` : ''));
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
     * @param {{user_id: number}} payload
     * @return {Promise<any>}
     */
    async getTree(payload) {
        const result = await this._query({
            payload,
            nestedEndpoint: 'get-tree'
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