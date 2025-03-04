<template>
	<el-tree-select
		v-model="staticRole"
		:data="options"
		:render-after-expand="false"
		:props="{ label: 'title', children: 'children', isLeaf: (data) => data.type === 'role', }"
		value-key="item_id"
		v-bind="$attrs"
		lazy
		filterable
		remote
		remote-show-suffix
		:remote-method="searchStaticRoles"
		:load="loadStaticRoles"
		@change="handleChangeStaticRole"
		:placeholder="placeholder"
		v-if="searchType === ITEM_TYPE.STATIC_ROLE"
	/>
	<el-select
		v-model="item"
		clearable
		remote
		remote-show-suffix
		:remote-method="search"
		filterable
		value-key="id"
		:loading="loading"
		:placeholder="placeholder"
		@change="handleChange"
		v-bind="$attrs"
		v-else
	>
		<el-option
			v-for="option in options"
			:key="option.id"
			:label="option.title"
			:value="option"
			:disabled="disabledOption(option.id)"
		/>
	</el-select>
</template>
<script setup>
import { computed, inject, ref, watch } from 'vue';
import { ITEM_TYPE } from './constants';
import { Item } from './Item';
import { ElMessage } from 'element-plus';

const api = inject('api');
const hideList = inject('hideList');

const emit = defineEmits(['change']);

const props = defineProps({
	searchType: {
		type: Number,
		required: true,
	},
	items: {
		type: Array,
		required: true,
	},
});

const placeholder = computed(() => {
	switch (props.searchType) {
		case ITEM_TYPE.USER:
			return 'Поиск пользователя';
		case ITEM_TYPE.STATIC_ROLE:
			return 'Поиск статичной роли';
		case ITEM_TYPE.DYNAMIC_ROLE:
			return 'Поиск динамической роли';
		default:
			return '';
	}
});

const item = defineModel();
const staticRole = ref(null);
const options = ref([]);
const loading = ref(false);

const disabledOption = (id) => {
	if (hideList) {
		return false;
	}

	return props.items.some(item => item.id === id);
};

/**
 * @param {string} query
 * @returns {Item[]}
 */
const searchUser = async (query) => {
	const result = await api.searchUser(query);
	return result.map(user => Item.createFromUser(user));
};

/**
 * @param {string} query
 * @returns {Item[]}
 */
const searchDynamicRole = async (query) => {
	const result = await api.searchDynamicRole(query);
	return result.map(role => Item.createFromDynamicRole(role));
};


/**
 * @param {string}
 */
const search = async (query) => {
	if (!query) return;

	try {
		loading.value = true;

		if (props.searchType === ITEM_TYPE.USER) {
			options.value = await searchUser(query);
		} else if (props.searchType === ITEM_TYPE.DYNAMIC_ROLE) {
			options.value = await searchDynamicRole(query);
		}
	} catch (e) {
		ElMessage({
			type: 'error',
			title: 'Произошла ошибка!',
			message: e.message,
			duration: 3000,
		});
		console.error(e);
	} finally {
		loading.value = false;
	}
};

const handleChangeStaticRole = async (staticRoleId) => {
	const typeId = `${staticRoleId}`.slice(-1);

	if (typeId == 1) {
		return;
	}

	const role = await api.getStaticRole(`${staticRoleId}`.slice(0, -1));

	if (!role) {
		return;
	}

	emit('change', Item.createFromStaticRole(role));

	options.value = await api.searchStaticRole(null);
	staticRole.value = null;
};

const loadStaticRoles = async (node, resolve) => {
	const result = await api.searchStaticRole(node.data.id ? node.data.id : null);
	resolve(result);
};

let oldQuery = '';
const searchStaticRoles = async (query) => {
	query = query.trim();

	if (!query && oldQuery) {
		options.value = await api.searchStaticRole(null);
	} else if (query) {
		options.value = await api.searchTreeStaticRole(query);
	}

	oldQuery = query;
};

const handleChange = (item) => {
	options.value = [];
	emit('change', item);
};

watch(() => props.searchType, async (searchType) => {
	if (searchType !== ITEM_TYPE.STATIC_ROLE) {
		options.value = [];
	}
});
</script>