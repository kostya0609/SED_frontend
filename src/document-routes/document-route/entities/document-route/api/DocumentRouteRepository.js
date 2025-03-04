import { BaseRepository } from "@common/shared/api/BaseRepository";

export class DocumentRouteRepository extends BaseRepository {
    constructor() {
        super();
        this.setSubmodule('document-routes');
        this.setEndpoint('routes');
    }

    /**
     * @param {string} nestedEndpoint
     * @returns {module:url.URL}
     */
    _buildUrl(nestedEndpoint) {
        return new URL(`${this._url}/${this._endpoint}/${this._version}` + (nestedEndpoint ? `/${nestedEndpoint}` : ''));
    }

    /**
     * @param {{
     * user_id: number,
     * title: string,
     * direction_id: number,
     * group_id: number,
     * description: string,
     * parent_id: number,
     * departments: array,
     * is_active: boolean   
     * }} payload
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
     * @param {{
     * id: number   
     * user_id: number,
     * title: string,
     * direction_id: number,
     * group_id: number,
     * description: string,
     * parent_id: number,
     * departments: array,
     * is_active: boolean
     * }} payload
     * @return {Promise<any>}
     */
    async edit(payload) {
        const result = await this._query({
            payload,
            nestedEndpoint: 'edit'
        });
        this._handleError(result);
        return result.data;
    }

    /**
     * @param {{user_id: number}} payload
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

    /**
     * @param {{user_id: number, id: number}} payload
     * @return {Promise<any>}
     */
    async deactivate(payload) {
        const result = await this._query({
            payload,
            nestedEndpoint: 'deactivate'
        });
        this._handleError(result);
        return result.data;
    }

    async getAdditionalData() {
        const result = await this._query({
            payload: {},
            nestedEndpoint: 'get-additional-data'
        });
        this._handleError(result);
        return result.data;
    }

    /**
     * @param {{user_id: number, parent_id: number}} payload
     * @return {Promise<any>}
     */
    async getRouteByParentId(payload) {
        const result = await this._query({
            payload,
            nestedEndpoint: 'get-route-by-parent-id'
        });
        this._handleError(result);
        return result.data;
    }
}