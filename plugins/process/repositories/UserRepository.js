import { BaseRepository } from "./BaseRepository";

export class UserRepository extends BaseRepository {
    constructor() {
        super();
        this
            .setModule('users')
            .setVersion('v2');
    }

    /**
     * @param {string} query
     * @return {Promise<any>}
     */
    async search(query) {
        const result = await this._query({
            payload: { query },
            nestedEndpoint: 'search'
        });

        if (!result.success)
            throw new Error(result.message);

        return result.data;
    }
}