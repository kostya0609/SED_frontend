import { BaseRepository } from "./BaseRepository";

export class SubuserRepository extends BaseRepository {
    async getAll( payload) {
        const result = await this._query({
            payload,
            nestedEndpoint: 'get-all-subusers',
        });

        if (!result.success)
            throw new Error(result.errors ? Object.values(result.errors) : result.message);

        return result.data;
    }
}