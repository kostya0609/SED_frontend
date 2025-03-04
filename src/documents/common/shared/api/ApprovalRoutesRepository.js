import { BaseRepository } from "@common/shared/api/BaseRepository";

export class ApprovalRoutesRepository extends BaseRepository {
    constructor() {
        super();
        this.setSubmodule('document-routes');
        this.setEndpoint('approval-routes');
    }

    async list(payload) {
        const result = await this._query({
            payload,
            nestedEndpoint: 'list'
        });
        this._handleError(result);
        return result.data;
    }
}