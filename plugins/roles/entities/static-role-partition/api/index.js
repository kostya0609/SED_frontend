import { StaticRolePartitionRepository } from './StaticRolePartitionRepository.js';

import { useRepoDecorator } from '@/plugins/roles/shared/utils/useRepoDecorator.js';

export const useStaticRolePartitionRepo = () => useRepoDecorator(StaticRolePartitionRepository);