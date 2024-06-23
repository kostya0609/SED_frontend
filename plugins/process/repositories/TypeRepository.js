import { BaseRepository } from "./BaseRepository";

export class TypeRepository extends BaseRepository {
    constructor() {
        super();
        this
            .setModule('processes')
            .setSubmodule('factory')
            .setEndpoint('types');
    }

    /**
     * @return Promise<any>
     */
    async list() {
        const result = await this._query({
            nestedEndpoint: 'list'
        });

        if (!result.success)
            throw new Error(result.message);

        return result;
    }
}