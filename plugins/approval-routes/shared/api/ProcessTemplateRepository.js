import { BaseRepository } from "./BaseRepository";

export class ProcessTemplateRepository extends BaseRepository {
    constructor() {
        super('processes', 'v1');
        this.setModule('processes');
        this.setSubmodule('factory');
    }

    /**
     * @returns {URL} 
     */
    _buildUrl(nestedEndpoint) {
        return new URL(`${this._url}/${this._endpoint}/${this._version}` + (nestedEndpoint ? `/${nestedEndpoint}` : ''));
    }

    /**
     * @param {{module_name: string}} payload
     * @return {Promise<any>}
     */
    async getTemplates(payload) {
        const result = await this._query({
            payload,
            nestedEndpoint: 'get-templates'
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
     * @param {{id: number}} payload
     * @return {Promise<any>}
     */
    async getTemplateById(payload) {
        const result = await this._query({
            payload,
            nestedEndpoint: 'get-for-approval'
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