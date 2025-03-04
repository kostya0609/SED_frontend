import { BaseRepository } from './BaseRepository';
import { UserRepository } from './UserRepository';
import { DepartmentRepository } from './DepartmentRepository';
import { useRepoDecorator } from '../utils/useRepoDecorator.js';

export const BaseRepo       = () => useRepoDecorator(BaseRepository);
export const DepartmentRepo = () => useRepoDecorator(DepartmentRepository);
export const UserRepo       = () => useRepoDecorator(UserRepository);
