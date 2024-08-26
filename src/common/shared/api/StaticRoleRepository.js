import {BaseRepository} from "./BaseRepository";

export class StaticRoleRepository extends BaseRepository {
    constructor() {
        super('roles', 'v1');
    }

    /**
     * @returns {URL} 
     */
    _buildUrl(nestedEndpoint){
        return new URL(`${this._url}/${this._endpoint}/${this._version}` + (nestedEndpoint ? `/${nestedEndpoint}` : ''));
    }

    /**
     * @param {string} q
     * @return Promise<any>
     */
    async search(q) {
        const result = await this._query({
            payload : {q},
            nestedEndpoint : 'statics/search'
        });

        if (!result.success)
            throw new Error(result.message);

        return result.data;
    }

    /**
     * @param {string} id
     * @return Promise<any>
     */
    async getUsersByRoleId(id) {
        const result = await this._query({
            payload : {id},
            nestedEndpoint : 'statics/get-users-by-role-id'
        });

        if (!result.success)
            throw new Error(result.message);

        return result.data;
    }
}