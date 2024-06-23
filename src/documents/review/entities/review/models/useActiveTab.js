import { ref } from "vue";

const activeTab = ref('description');

export const useActiveTab = () => {
    /**
     * @param {'description'|'additionalInfo'|'process'|'interaction'|'hierarchy'|'history'} tab
     */
    const setActiveTab = (tab) => {
        activeTab.value = tab;
    }

    return {
        activeTab,
        setActiveTab
    }
}