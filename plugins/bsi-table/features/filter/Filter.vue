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
import { injectLocal } from '@vueuse/core';
import { FilterForm } from './filter-form';

const emitter = injectLocal('emitter');

const filter = defineModel('filter', { type: Array, default: [] });
const state = defineModel('state', { type: Object, default: null });

const handleFilterChange = (filter) => {
	emitter.emit('state-save', { filter });
	emitter.emit('change-data', { filter });
};

emitter.on('state-loaded', (stateFromStorage) => {
	if (!stateFromStorage) {
		return;
	}

	if (stateFromStorage.filter) {
		state.value = stateFromStorage.filter;
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