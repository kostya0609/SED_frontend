<template>
	<BaseTable v-bind="{ ...$attrs, data, total, customizable }">
		<template #prepend-header>
			<FilterButton
				:filter="filter"
				v-if="filterable"
			/>
			<Search v-if="searchable" />
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
const loading = ref(false);


const emitChangeEvent = async () => {
	try {
		if (!props.change) {
			return;
		}

		loading.value = true;
		const result = await props.change(getSettings());

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

emitter.on('state-save', async (state) => {
	await store.save({
		moduleName: moduleName,
		tableId: props.id,
		userId: userId,
		data: state,
	});
});

emitter.on('change-data', async (state) => {
	settingsMerge(state);

	await emitChangeEvent();
});

onMounted(async () => {
	const state = await store.get(moduleName, props.id, userId);
	settingsMerge(state);
	emitter.emit('state-loaded', getSettings());
});

provideLocal('emitter', emitter);
provideLocal('loading', loading);
</script>