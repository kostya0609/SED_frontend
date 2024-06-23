import {UserRepository} from "./UserRepository";
import {DepartmentRepository} from "./DepartmentRepository";
import {ModuleRepository} from "./ModuleRepository";
import {RightRepository} from "./RightRepository";
import {GroupRepository} from "./GroupRepository";
import {AdditionalRightRepository} from "./AdditionalRightRepository"
import {AccessRepository} from "./AccessRepository";

import { useRepoDecorator } from '@/plugins/access/shared/utils/useRepoDecorator.js';

export const useDepartmentRepo      = () => useRepoDecorator(DepartmentRepository);
export const useUserRepo            = () => useRepoDecorator(UserRepository);
export const useModuleRepo          = () => useRepoDecorator(ModuleRepository);
export const useRightRepo           = () => useRepoDecorator(RightRepository);
export const useGroupRepo           = () => useRepoDecorator(GroupRepository);
export const useAdditionalRightRepo = () => useRepoDecorator(AdditionalRightRepository);
export const useAccessRepo          = () => useRepoDecorator(AccessRepository);