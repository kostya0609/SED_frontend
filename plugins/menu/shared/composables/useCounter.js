import { inject } from 'vue';

/**
 * @type {import('../../types').useCounter}
 */
export const useCounter = () => {
	const menu = inject('menu', []);

	const getItem = (index) => {
		const item = menu.value[index];

		if (!item) {
			throw new Error(`Не удалось получить элемент меню по индексу ${index}`);
		}

		return item;
	};

	const getCounter = (index) => {
		const item = getItem(index);
		return item.count;
	};

	const setCounter = (index, count) => {
		getItem(index).count = count;
	};

	const clearCounter = (index) => {
		getItem(index).count = 0;
	};

	const increment = (index) => {
		getItem(index).count++;
	};

	const decrement = (index) => {
		const item = getItem(index);

		if (item.count > 0) {
			item.count--;
		}
	};

	return {
		getCounter,
		setCounter,
		clearCounter,
		increment,
		decrement,
	};
};