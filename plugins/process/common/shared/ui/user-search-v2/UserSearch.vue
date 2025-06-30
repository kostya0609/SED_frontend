<template>
	<div class="user-search-v2">
		<div
			class="user-search-v2__inner"
			v-if="!disabled"
		>
			<SelectType
				v-model="searchType"
				class="user-search-v2__type"
				v-if="selectRoles"
			/>
			<UserSelect
				v-model="item"
				:search-type="searchType"
				@change="handleChange"
				class="user-search-v2__search"
				:only-user="onlyUser"
				:items="items"
				:disabled-select="disabledSelect"
			/>
		</div>
		<UserList
			v-model:active="showUserList"
			v-model="items"
			@delete="handleDeleteItem"
			@change="handleChangeInItemList"
			v-if="items.length && !hideList"
		/>		
	</div>

</template>
<script setup>
import { computed, provide, ref, watchEffect } from 'vue';
import SelectType from './SelectType.vue';
import UserSelect from './UserSelect.vue';
import UserList from './UserList.vue';
import { ITEM_TYPE } from './constants';
import { useTransfomers } from './useTransfomers';

const searchType = ref(ITEM_TYPE.USER);

const item = ref(null);
const items = ref([]);

const props = defineProps({
	multiple: { type: Boolean, default: false },
	hideList: { type: Boolean, default: false },
	deletion: { type: Boolean, default: false },
	userId: { type: Number, default: null },
	selectRoles: { type: Boolean, default: false },
	onlyUser: { type: Boolean, default: false },
	disabled: { type: Boolean, default: false },
	api: {
		type: Object,
		default: {
			getStaticUsers: null,
			getDynamicUsers: null,
			searchUser: null,
			searchStaticRole: null,
			searchDynamicRole: null,
			getStaticRole: null,
			searchTreeStaticRole: null,
		},
		validator: (value) => {
			return (
				typeof value.getStaticUsers === 'function' &&
				typeof value.getDynamicUsers === 'function' &&
				typeof value.searchUser === 'function' &&
				typeof value.searchStaticRole === 'function' &&
				typeof value.searchDynamicRole === 'function' &&
				typeof value.getStaticRole === 'function' &&
				typeof value.searchTreeStaticRole === 'function'
			);
		},
	},
	dataTransformer: {
		type: Object,
		default: {
			inputTransformer: item => item,
			outputTransformer: item => item,
		},
	},
});

const { outputTransfomerItem, outputTransfomerItems, inputTransformerItem, inputTransformerItems } = useTransfomers(props.dataTransformer);

const emit = defineEmits(['change']);

const inputItems = defineModel({
	type: [Array, Object],
	requried: false,
	default: null,
});

const disabledSelect = computed(() => !!(!props.multiple && items.value.length && !items.value[0].can_deletable) );

if (props.multiple) {
	if (!Array.isArray(inputItems.value)) {
		throw new Error('Входные параметры должны быть массивом!');
	}
} else {
	if (typeof inputItems.value !== 'object' || Array.isArray(inputItems.value)) {
		throw new Error('Входные параметры должны быть объектом или null!');
	}
}

/**
 * 0 - список закрыт, 1 - список раскрыт
 * 0/1 потому что компонент el-collapse ожидает имя таба, на true/false нет возможности заменить
 */
const showUserList = ref(1);

const handleChange = (_item) => {

	if (props.multiple) {
		items.value.push(_item);

		let resultItems = props.onlyUser ? inputTransformerItems(items.value) : items.value;

		inputItems.value = resultItems;
		emit('change', resultItems);
	} else {
		items.value = [_item];

		let resultItems = props.onlyUser ? inputTransformerItem(items.value[0]) : items.value[0];

		inputItems.value = resultItems;
		emit('change', resultItems);
	}

	item.value = null;
	showUserList.value = 1;
};

const handleDeleteItem = (_item, _items) => {
	if (props.multiple) {
		inputItems.value = props.onlyUser ? inputTransformerItems(_items) : _items;
	} else {
		inputItems.value = null;
	}
};

const handleChangeInItemList = (items) => {
	if (props.multiple) {
		inputItems.value = props.onlyUser ? inputTransformerItems(items) : items;
	} else {
		inputItems.value = items[0] || null;
	}
};

watchEffect(() => {	
	if (props.multiple) {
		items.value = props.onlyUser ? outputTransfomerItems(inputItems.value) : inputItems.value;
	} else {
		if (inputItems.value) {
			items.value = props.onlyUser ? [outputTransfomerItem(inputItems.value)] : [inputItems.value];
		} else {
			items.value = [];
		}
	}
});

const deletion = computed(() => props.deletion);
const userId = computed(() => props.userId);
const disabled = computed(() => props.disabled);
const multiple = computed(() => props.multiple);

provide('userId', userId);
provide('api', props.api);
provide('deletion', deletion);
provide('disabled', disabled);
provide('multiple', multiple);
provide('hideList', props.hideList);
</script>
<style lang="scss">
.user-search-v2 {
	display: flex;
	flex-direction: column;
	gap: .25rem;

	&__inner {
		display: flex;
		gap: .5rem;
	}

	&__type {
		flex: 0 150px;
	}
}
</style>