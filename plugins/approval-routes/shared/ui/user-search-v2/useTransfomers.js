import { Item } from './Item';

/**
 * @typedef {import('./Item').Item} Item
 * @param {{ inputTransformer: (item: any) => Item, outputTransformer: (item: Item) => any}} transformer 
 */
export const useTransfomers = (transformer) => {
	const outputTransfomerItem = transformer.inputTransformer;

	const inputTransformerItem = transformer.inputTransformer;

	/**
	 * @param {import('./Item').Item[]} items 
	 * @returns {import('./Item').User[]}
	 */
	const outputTransfomerItems = (items) => {
		return items.map(outputTransfomerItem).filter(user => !!user);
	};

	/**
	 * @param {import('./Item').User[]}
	 * @returns {import('./Item').Item[]}
	 */
	const inputTransformerItems = (users) => {
		return users.map(inputTransformerItem).filter(item => !!item);
	};

	return {
		outputTransfomerItem,
		outputTransfomerItems,
		inputTransformerItem,
		inputTransformerItems,
	};
};