<template>
	<el-input
		v-model="query"
		placeholder="Поиск"
		prefix-icon="Search"
		@input="handleSearch"
	/>
</template>
<script setup>
import { injectLocal } from '@vueuse/core';
import { ref } from 'vue';

const emitter = injectLocal('emitter');

const query = ref('');

const handleSearch = () => {
	emitter.emit('change-data', { search: query.value });
};
</script>