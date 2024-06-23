import { useModuleRepo } from '@/plugins/access/repositories';
import { notify } from '@/plugins/access/shared/utils/';
import {ref} from 'vue'

export const useModuleList = () => {
    const moduleList = ref([]);

    const initModuleList = async(user_id) => {
        try {
            const ModuleRepo = useModuleRepo();
            let result = await ModuleRepo.list({user_id});
            
            if(result.data) {
              moduleList.value = result.data;
            }

            moduleList.value.push({ code: 'empty_module', name: 'Нет модуля' })
            
          } catch (e) {
            notify({ title: 'Ошибка при выполнении запроса получения списка модулей', message: e.message, type: 'error' });
          } finally {}
    };

    return {moduleList, initModuleList};
};