// src/shared/api/DocumentRepository.js
import { BaseRepository } from './BaseRepository';

export class DepartmentRepository extends BaseRepository {
  constructor() {
    super();
    this.setModule('departments');
    this.setVersion('v2');
  }
  
  async getByUser(payload) {
    return this._query({
      nestedEndpoint: 'get-by-user',
      method: 'POST',
      payload,
    });
  }

  async search(payload) {
    return this._query({
      nestedEndpoint: 'search',
      method: 'POST',
      payload,
    });
  }

}

export const DepartmentRepo = new DepartmentRepository();
