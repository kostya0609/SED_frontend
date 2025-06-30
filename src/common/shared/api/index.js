export { BaseRepository } from './BaseRepository';

import { InitialRepository } from './InitialRepository';
import { UserRepository } from './UserRepository';
import { StaticRoleRepository } from './StaticRoleRepository';
import { DynamicRoleRepository } from './DynamicRoleRepository';
import { DepartmentRepository } from './DepartmentRepository';
import { SubuserRepository } from './SubuserRepository';

export const InitRepo = new InitialRepository();
export const UserRepo = new UserRepository();
export const StaticRoleRepo = new StaticRoleRepository();
export const DynamicRoleRepo = new DynamicRoleRepository();
export const DepartmentRepo = new DepartmentRepository();
export const SubuserRepo= new SubuserRepository();