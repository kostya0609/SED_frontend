<template>
	<el-input
		v-model="query"
		placeholder="Поиск..."
		@input="debouncedSearch"
		clearable
	/>
</template>
<script setup>
import { injectLocal, useDebounceFn } from '@vueuse/core';
import { ref, watch } from 'vue';

const emitter = injectLocal('emitter');

const emit = defineEmits(['change']);

const query = ref('');

const handleSearch = () => {
	if (query.value.length >= 2) {
		emit('change');
		emitter.emit('state-save', { search: query.value }, 'local');
		emitter.emit('change-data', { search: query.value, paginate: { page: 1 } });
	}
};

const debouncedSearch = useDebounceFn(handleSearch, 400);

const clearSearch = () => {
	query.value = '';
	emitter.emit('state-save', { search: query.value }, 'local');
	emitter.emit('change-data', { search: '' });

	emit('change');
};

emitter.on('state-loaded', (stateFromStorage) => {
	if (!stateFromStorage) {
		return;
	}

	if (stateFromStorage.search) {
		query.value = stateFromStorage.search;
	}
});

watch(query, (newValue) => {
	if (newValue === '') {
		clearSearch();
	}
});
</script>