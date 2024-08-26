import { ref } from "vue";

/**
 * @param {number} _currentPage 
 * @param {number} _perPage 
 * @param {number} _total 
 * @return {{currentPage: import("vue").Ref<number>, perPage: import("vue").Ref<number>, total: import("vue").Ref<number>, setPaginate: Function}}
 */
export const usePaginate = (_currentPage, _perPage, _total = 0) => {
	const currentPage = ref(_currentPage);
	const perPage = ref(_perPage);
	const total = ref(_total);

	const setPaginate = (_currentPage, _perPage, _total) => {
		currentPage.value = _currentPage;
		perPage.value = _perPage;
		total.value = _total;
	};

	return {
		currentPage,
		perPage,
		total,
		setPaginate,
	};
};