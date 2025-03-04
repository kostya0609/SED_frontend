import { BaseRepository } from "@common/shared/api/BaseRepository";

export class ApprovalRoutesRepository extends BaseRepository {
    constructor() {
        super('approval-routes', 'v1');
        this.setSubmodule('document-routes');
    }

    /**
     * @param {string} nestedEndpoint
     * @returns {module:url.URL}
     */
    _buildUrl(nestedEndpoint) {
        return new URL(`${this._url}/${this._endpoint}/${this._version}` + (nestedEndpoint ? `/${nestedEndpoint}` : ''));
    }

    /**
     * @param {{user_id: number, tmp_doc_id: number}} payload
     * @return {Promise<any>}
     */
    async list(payload) {
        const result = await this._query({
            payload,
            nestedEndpoint: 'list'
        });
        this._handleError(result);
        return result.data;
    }

    /**
     * @param {{user_id: number, tmp_doc_id: number, title: string, stages: array }} payload
     * @return {Promise<any>}
     */
    async create(payload) {
        const result = await this._query({
            payload,
            nestedEndpoint: 'create'
        });
        this._handleError(result);
        return result.data;
    }

    /**
     * @param {{user_id: number, tmp_doc_id: number, id: number, title: string, stages: array }} payload
     * @return {Promise<any>}
     */
    async update(payload) {
        const result = await this._query({
            payload,
            nestedEndpoint: 'update'
        });
        this._handleError(result);
        return result.data;
    }

    /**
     * @param {{user_id: number, id: number}} payload
     * @return {Promise<any>}
     */
    async delete(payload) {
        const result = await this._query({
            payload,
            nestedEndpoint: 'delete'
        });
        this._handleError(result);
        return result.data;
    }
}