import { BaseRepository } from "@common/shared/api/BaseRepository";

export class DepartmentRepository extends BaseRepository {
    constructor() {
        super('departments', 'v1');
    }
    
    /**
     * @returns {URL} 
     */
    _buildUrl(nestedEndpoint){
        return new URL(`${this._url}/${this._endpoint}/${this._version}` + (nestedEndpoint ? `/${nestedEndpoint}` : ''));
    }
    
    /**
     * @param {{user_id: number}} payload
     * @return {Promise<any>}
     */
    async getTree(payload) {
        const result = await this._query({
            payload,
            nestedEndpoint: 'list'
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