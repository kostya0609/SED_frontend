<template>
	<div class="filter">
		<div class="filter__body">
			<div class="filter__form-wrapper">
				<FilterForm
					@filter="handleFilterChange"
					@reset="handleFilterChange"
					:filter="filter"
					:state="state"
				/>
			</div>
		</div>
	</div>
</template>
<script setup>
import { injectLocal, set } from '@vueuse/core';
import { FilterForm } from './filter-form';

const emitter = injectLocal('emitter');

const emit = defineEmits(['change', 'change-fields']);

const filter = defineModel('filter', { type: Array, default: [] });
const state = defineModel('state', { type: Object, default: null });

const transformData = (data) => {
	for (const item in data) {
		if (Array.isArray(data[item].value)) {
			data[item].value = data[item].value.map((obj) => {
				return obj.id;
			});
		}
	}
	return data;
}

const handleFilterChange = (filter) => {
	emitter.emit('state-save', { filter: filter }, 'local');
	emitter.emit('change-data', { filter: filter });

	emit('change-fields', filter);
	emit('change', filter);
};

emitter.on('before-change-data', (settings, updateSettings) => {
	/** В этом обработчике не использовать асинихронные операции! */
	
	if (!settings.filter) {
		return;
	}

	const filterCopy = JSON.parse(JSON.stringify(settings.filter));
	const filterTransformed = transformData(filterCopy);

	updateSettings({ filter: filterTransformed });
});

emitter.on('state-loaded', (stateFromStorage) => {
	if (!stateFromStorage) {
		return;
	}

	if (stateFromStorage.filter) {
		state.value = stateFromStorage.filter;
		emit('change-fields', stateFromStorage.filter);
	}
});
</script>
<style lang="scss" scoped>
.filter {
	display: flex;
	flex-direction: column;
	gap: .5rem;

	&__body {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
	}

	&__profiles-wrapper {
		flex: 0 1 300px;
	}

	&__form-wrapper {
		flex: 1;
	}

	&__footer {
		display: flex;
		justify-content: flex-end;
	}
}
</style>