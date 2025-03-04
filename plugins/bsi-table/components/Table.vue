<template>
	<BaseTable
		v-bind="{ ...$attrs, data, total, customizable }"
		v-model:current-page="currentPage"
	>
		<template #prepend-header>
			<slot name="prepend-header" />
			<FilterButton
				:filter="filter"
				@change="goToFirstOnePage"
				v-if="filterable"
			/>
			<Search
				class="bsi-table-search-field"
				@change="goToFirstOnePage"
				v-if="searchable"
			/>
		</template>
		<template #append-header>
			<slot name="append-header" />
		</template>
		<template #append-footer>
			<slot name="append-footer" />
		</template>
		<template #prepend-footer>
			<slot name="prepend-footer" />
		</template>
		<slot />
	</BaseTable>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { useEventEmitter } from '../shared/events';
import { injectLocal, provideLocal } from '@vueuse/core';
import { useStorage, useSetting } from '../entities/setting';
import { BaseTable } from '../widgets/base-table';
import { FilterButton } from '../features/filter';
import { Search } from '../features/search';

const moduleName = injectLocal('moduleName');
const userId = injectLocal('userId');
const variableStore = injectLocal('table-local-store');

const props = defineProps({
	change: {
		type: Function,
		defualt: () => null,
	},
	id: String,
	filter: {
		type: Array,
		default: [],
	},
	storage: {
		type: String,
		default: 'none',
		validator: (value) => ['none', 'local'].includes(value),
	},
	filterable: {
		type: Boolean,
		default: false,
	},
	searchable: {
		type: Boolean,
		default: false,
	},
	customizable: {
		type: Boolean,
		default: true,
	},
});

const store = useStorage(props.storage);

const emitter = useEventEmitter();
const { getSettings, settingsMerge } = useSetting();

const data = defineModel('data', { default: [] });
const total = defineModel('total', { default: 0 });
const currentPage = ref(1);

const loading = ref(false);

const goToFirstOnePage = () => {
	currentPage.value = 1;

	emitter.emit('state-save', {
		paginate: {
			page: currentPage.value,
		}
	}, 'local');
};

const emitChangeEvent = async () => {
	try {
		if (!props.change) {
			return;
		}

		loading.value = true;

		const currentSettings = JSON.parse(JSON.stringify(getSettings()));

		emitter.emit('before-change-data', currentSettings, (newSettings) => {
			Object.assign(currentSettings, newSettings);
		});

		const result = await props.change(currentSettings);

		if (result) {
			data.value = result.data;
			total.value = result.total;
		}
	} catch (e) {
		throw e;
	} finally {
		loading.value = false;
	}
};

emitter.on('state-loaded', async (state) => {
	if (!state) {
		await emitChangeEvent();
		return;
	}

	settingsMerge(state);

	await emitChangeEvent();
});

emitter.on('state-save', async (state, storageType) => {
	if (storageType === 'local') {
		await variableStore.save({
			moduleName: moduleName,
			tableId: props.id,
			userId: userId,
			data: state,
		});
	} else {
		await store.save({
			moduleName: moduleName,
			tableId: props.id,
			userId: userId,
			data: state,
		});
	}
});

emitter.on('change-data', async (state) => {
	settingsMerge(state);

	await emitChangeEvent();
});

const state = await store.get(moduleName, props.id, userId);
const variableState = await variableStore.get(moduleName, props.id, userId);

onMounted(async () => {
	settingsMerge(variableState);
	settingsMerge(state);

	emitter.emit('state-loaded', getSettings());
});

provideLocal('emitter', emitter);
provideLocal('loading', loading);

defineExpose({
	forceUpdate: emitChangeEvent,
});
</script>