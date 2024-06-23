import {BaseRepository} from "@common/shared/api/BaseRepository.js";

export class GridRepository extends BaseRepository {
    constructor() {
        super('add','default');
    }

    /**
     * @param {Object} payload
     * @return {Promise<any>}
     */
    async loadFilter(payload) {
        const result = await this._query({
            payload,
        });

        if (result.status !== 'success')
            throw new Error(result.message);

        return result;
    }

}