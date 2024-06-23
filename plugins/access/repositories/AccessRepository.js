import {BaseRepository} from "./BaseRepository";

export class AccessRepository extends BaseRepository {
    constructor() {
        super();
        this.setModule('accesses').setEndpoint('users');
    }

    /**
     *  @param {{ user_id: number; module: string }} payload
     *  @return {Promise<any>}
     */
    async rights(payload) {
        const result = await this._query({
            payload,
            nestedEndpoint : 'rights'
        });

        if (!result.success)
            throw new Error(result.message);

        return result;
    }

}



