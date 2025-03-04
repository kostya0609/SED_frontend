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
        this._handleError(result);
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
        this._handleError(result);
        return result.data;
    }

    /**
     * @returns {Promise<any>}
     */
    async getTreeForSelectTemplate() {
        const result = await this._query({
            payload: {},
            nestedEndpoint: 'get-tree-for-select-template',
        });
        this._handleError(result);
        return result.data;
    }

    /**
     * @param {{title: string, parent_id: ?number}} payload
     * @return {Promise<any>}
     */
    async create(payload) {
        const result = await this._query({
            payload,
            nestedEndpoint: 'create',
        });
        this._handleError(result);
        return result.data;
    }

    /**
     * @param {{id: number, title: ?string, parent_id : ?number}} payload
     * @return {Promise<any>}
     */
    async edit(payload) {
        const result = await this._query({
            payload,
            nestedEndpoint: 'edit',
        });
        this._handleError(result);
        return result.data;
    }

    /**
     * @param {{id: number}} payload
     * @return {Promise<any>}
     */
    async delete(payload) {
        const result = await this._query({
            payload,
            nestedEndpoint: 'delete',
        });
        this._handleError(result);
        return result.data;
    }
}