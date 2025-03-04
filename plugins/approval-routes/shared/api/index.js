export { BaseRepository } from './BaseRepository';
import { useRepoDecorator } from '../utils/useRepoDecorator.js';

import { ProcessTemplateRepository } from './ProcessTemplateRepository';
import { UserRepository } from './UserRepository';
import { StaticRoleRepository } from './StaticRoleRepository';
import { DynamicRoleRepository } from './DynamicRoleRepository';
import { TypeRepository } from './TypeRepository';
import { ApprovalRouteRepository } from './ApprovalRouteRepository';

export const useProcessTemplateRepo = () => useRepoDecorator(ProcessTemplateRepository);
export const useUserRepo = () => useRepoDecorator(UserRepository);
export const useStaticRoleRepo = () => useRepoDecorator(StaticRoleRepository);
export const useDynamicRoleRepo = () => useRepoDecorator(DynamicRoleRepository);
export const useTypeRepo = () => useRepoDecorator(TypeRepository);
export const useApprovalRouteRepo = () => useRepoDecorator(ApprovalRouteRepository);