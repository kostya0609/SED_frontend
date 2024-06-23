import { inject, toRaw } from 'vue';

/**
 * @type {import('../../types').useMenu}
 */
export const useMenu = () => {
	const menu = inject('menu', []);

	const hasItem = (index) => !!menu.value[index];

	const checkHasItem = (index) => {
		if (!hasItem(index)) {
			throw new Error(`Не удалось получить элемент меню по индексу ${index}`);
		}
	};

	const getItemIndex = (item) => menu.value.map(toRaw).indexOf(item);

	const getItem = (index) => {
		const item = menu.value[index];

		if (!item) {
			throw new Error(`Не удалось получить элемент меню по индексу ${index}`);
		}

		return item;
	};

	const addItem = (item) => {
		menu.value = [...menu.value, item];
		return getItemIndex(item);
	};

	const updateItem = (index, item) => {
		checkHasItem(index);
		menu.value[index] = { ...getItem(index), ...item };
	};

	const removeItem = (index) => {
		checkHasItem(index);
		menu.value.splice(index, 1);
	};


	return {
		menu,
		hasItem,
		getItem,
		getItemIndex,
		addItem,
		updateItem,
		removeItem,
	};
};