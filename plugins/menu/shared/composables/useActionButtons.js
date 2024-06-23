import { inject, toRaw } from 'vue';

/**
 * @type {import('../../types').useActionButtons}
 */
export const useActionButtons = () => {
	const buttons = inject('actionButtons', []);

	const hasButton = (index) => !!buttons.value[index];

	const checkHasButton = (index) => {
		if (!hasButton(index)) {
			throw new Error(`Не удалось получить кнопку по индексу ${index}`);
		}
	};

	const getButton = (index) => {
		checkHasButton(index);

		return buttons.value[index];
	};

	const getButtonIndex = (button) => buttons.value.map(toRaw).indexOf(button);

	const addButton = (button) => {
		buttons.value = [...buttons.value, button];
		return getButtonIndex(button);
	};

	const updateButton = (index, button) => {
		checkHasButton(index);
		buttons.value[index] = { ...buttons.value[index], ...button };
	};

	const removeButton = (index) => {
		checkHasButton(index);
		buttons.value.splice(index, 1);
	};

	const clearButtons = () => {
		buttons.value = [];
	};

	return {
		buttons,
		getButton,
		getButtonIndex,
		addButton,
		updateButton,
		removeButton,
		clearButtons,
	};
};