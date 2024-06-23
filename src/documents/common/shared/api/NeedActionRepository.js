import { BaseRepository } from "@common/shared/api/BaseRepository";

export class NeedActionRepository extends BaseRepository {
    constructor() {
        super();
        this.setModule('count-control');
        this.setEndpoint('need-actions');
    }
    
    async add(payload) {
        const result = await this._query({
            payload,
            nestedEndpoint: 'add'
        });
        if (!result.success)
            throw new Error(result.message);

        return result.data;
    }

    async delete(payload) {
        const result = await this._query({
            payload,
            nestedEndpoint: 'delete'
        });
        if (!result.success)
            throw new Error(result.message);

        return result.data;
    }

    async get(payload) {
        const result = await this._query({
            payload,
            nestedEndpoint: 'get'
        });
        if (!result.success)
            throw new Error(result.message);

        return result.data;
    }



}