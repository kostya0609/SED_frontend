import { useStorage } from '@vueuse/core'

const activeTab = useStorage('sed-document-routes-active-tab', 'description', sessionStorage);

export const useActiveTab = () => {
    
    const setDefaultTab = () => {
        activeTab.value = 'description';
    }

    return {
        activeTab,
        setDefaultTab
    }
}