import { useStorage } from '@vueuse/core';

const activeList = useStorage('sed-documents-active-list', '/sed', sessionStorage);

export const useActiveList = () => {
	
	/**
	 * @param {string} list
	 */
	const setActiveList = (list) => {
		activeList.value = list;
	};

	return {
		activeList,
		setActiveList,
	};
};