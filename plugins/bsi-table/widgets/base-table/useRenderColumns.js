import { injectLocal } from '@vueuse/core';
import { ref, useSlots } from 'vue';

export const useRenderColumns = () => {
	const slots = useSlots();
	const columnsObjects = ref([]);
	const columnsComponents = ref([]);
	const emitter = injectLocal('emitter');

	const renderColumns = () => {
		const columnsNames = columnsObjects.value.filter(col => col.is_active).map(col => col.prop);

		const columns = columnsComponents.value
			.filter(component => columnsNames.includes(component.props.prop))
			.map(component => {
				const columnObject = columnsObjects.value.find(column => column.prop === component.props.prop);
				component.props = {
					...component.props,
					width: columnObject.width,
					key: component.props.prop,
				};

				return component;
			})
			.sort((componentA, componentB) => {
				const columnObjectA = columnsObjects.value.find(column => column.prop === componentA.props.prop);
				const columnObjectB = columnsObjects.value.find(column => column.prop === componentB.props.prop);

				return columnObjectA.order - columnObjectB.order;
			});

		return columns;
	};

	const getColumns = (slots) => {
		if (slots.length > 1) {
			return slots;
		}

		const item = slots[0];
		
		if (item.type.__name === 'BsiTableColumn') {
			return slots;
		}

		return getColumns(item.children);
	};

	const setColumns = (columns) => {
		columnsObjects.value = columns;
	};

	emitter.on('state-loaded', (state) => {
		let columns = [];
		columnsComponents.value = slots.default ? getColumns(slots.default()) : [];

		columns = columnsComponents.value.map((component, index) => {
			return {
				...component.props,
				is_active: true,
				order: index,
			};
		});

		if (state && state.columns) {
			const mappedColumns = columns.map(column => {
				const stateColumn = state.columns.find(item => item.prop === column.prop);

				if (stateColumn) {
					return {
						...column,
						...stateColumn,
					};
				}

				return {
					...column
				};
			});
			setColumns(mappedColumns);
		} else {
			setColumns(columns);
		}

		if (!slots.default || slots.default().length === 0) {
			throw new Error('Не переданны колонки таблицы!');
		}
	});

	return {
		renderColumns,
		setColumns,
		columnsObjects,
	};
};