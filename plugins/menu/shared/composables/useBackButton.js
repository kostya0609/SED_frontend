import { useRouter } from 'vue-router';
import { useActionButtons } from './';
import { onMounted, onUnmounted } from 'vue';
/**
 * @param {import('@/plugins/menu/types').MenuButton} options
 */
export const useBackButton = (options = { goBack: true }) => {
	const { addButton, removeButton, getButtonIndex } = useActionButtons();
	const button = {
		title: 'Вернуться назад',
		...options,
	};

	if (options.fallbackPath) {
		button.goBack = true;
	}

	onMounted(() => {
		addButton(button);
	});

	onUnmounted(() => {
		const backButtonIndex = getButtonIndex(button);
		removeButton(backButtonIndex);
	});
};