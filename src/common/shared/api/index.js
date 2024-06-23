export { BaseRepository } from './BaseRepository';

import { InitialRepository } from './InitialRepository';
import { UserRepository } from './UserRepository';


export const UserRepo = new UserRepository();
export const InitRepo = new InitialRepository();
