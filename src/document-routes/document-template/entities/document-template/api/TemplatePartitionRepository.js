import { BaseRepository } from "@common/shared/api/BaseRepository";

export class TemplatePartitionRepository extends BaseRepository {
    constructor() {
        super();
        this.setSubmodule('document-routes');
        this.setEndpoint('template-partitions');
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
     * root_id: number,
     * parent_id: number,
     * route_id: number,     
     * parent_type: string,
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
     * user_id: number,
     * title: string,
     * root_id: number,
     * parent_id: number,
     * template_partition_id: number,
     * route_id: number,          
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
     * @param {{
     * user_id: number, 
     * root_id: number,    
     * parent_id: number,
     * template_partition_id: number,
     * route_id: number,     
     * }} payload
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