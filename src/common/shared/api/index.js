export { BaseRepository } from './BaseRepository';

import { InitialRepository } from './InitialRepository';
import { UserRepository } from './UserRepository';
import { StaticRoleRepository } from './StaticRoleRepository';
import { DepartmentRepository } from './DepartmentRepository';

export const UserRepo = new UserRepository();
export const StaticRoleRepo = new StaticRoleRepository();
export const InitRepo = new InitialRepository();
export const DepartmentRepo = new DepartmentRepository();