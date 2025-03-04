import { BaseRepository } from '@/common/shared/api';

export class DocumentTypeRepository extends BaseRepository {
    constructor() {
        super();
        this.setSubmodule('documents');
    }

    async getAll() {
        const result = await this._query({
            nestedEndpoint: 'types/list',
        });
        this._handleError(result);
        return result.data;
    }
}