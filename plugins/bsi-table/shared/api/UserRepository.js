// src/shared/api/DocumentRepository.js
import { BaseRepository } from './BaseRepository';

export class UserRepository extends BaseRepository {
  constructor() {
    super();
    this.setModule('users');
    this.setVersion('v2');
  }
  
  async search(payload) {
    return this._query({
      nestedEndpoint: 'search',
      method: 'POST',
      payload,
    });
  }

}

export const UserRepo = new UserRepository();
