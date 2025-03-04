<template>
	<div class="search">
		<el-select
			v-if="!disabled"
			v-model="searchType"
			class="search__type"
			@change="role = null"
		>
			<el-option
				v-for="item in searchTypeList"
				:key="item.value"
				:label="item.label"
				:value="item.value"
			/>
		</el-select>

		<SearchUser
			ref="seacrUserRef"
			v-if="searchType === 'FIO'"
			v-model:users="users"
			:multiple="multiple"
			class="search__users"
			@change="handleChangeUser"
			:disabled="disabled"
		/>

		<SearchStaticRole
			v-if="searchType === 'staticRole'"
			v-model="role"
			class="search__role"
		/>

		<SearchDynamicRole
			v-if="searchType === 'dynamicRole'"
			v-model="role"
			class="search__role"
		/>

		<el-button
			v-if="searchType === 'staticRole' || searchType === 'dynamicRole'"
			type="primary"
			class="search__btn"
			@click="applyRole"
			:disabled="!role"
		>
			<el-icon><Select /></el-icon>
		</el-button>

	</div>
</template>

<script setup>
import { ref, inject } from "vue";
import SearchUser from './SearchUser.vue';
import SearchStaticRole from './SearchStaticRole.vue';
import SearchDynamicRole from './SearchDynamicRole.vue';
import { notify } from "../../utils";

const { StaticRoleRepo } = inject('useRepo');

const users = defineModel('users');

const seacrUserRef = ref();

const props = defineProps({
	dynamicRole: {
		type: Boolean,
		default: false
	},
	multiple: {
		type: Boolean,
		default: false,
	},
	disabled: {
		type: Boolean,
		default: false,
	},
	hideOptions: {
		type: Boolean,
		default: false,
	}
});

const emit = defineEmits(['addUsers', 'addStaticRole', 'addDynamicRole']);

const loading = ref(false);

const role = ref(null);

const searchType = ref('FIO');
const searchTypeList = [
	{ value: 'FIO', label: 'ФИО' },
	{ value: 'staticRole', label: 'Статичная роль' },
];

if (props.dynamicRole) searchTypeList.push({ value: 'dynamicRole', label: 'Динамическая роль' });

const applyRole = async () => {
	if (!role.value) return;

	try {

		if (searchType.value === 'dynamicRole') {

			let send_role = { id: role.value.value, title: role.value.label }
			emit('addDynamicRole', send_role);
		};

		if (searchType.value === 'staticRole') {
			loading.value = true;
			let result = await StaticRoleRepo.getUsersByRoleId(role.value.value);

			if (!result || !result.length) {
				notify.error('Добавление участников', 'У выбранной статичной роли отсутствуют участники.');
				return;
			};

			if (!props.multiple && result.length > 1) {
				notify.error('Добавление участников', 'Допускается только один участник, но у выбранной статичной роли больше одного участника.');
				return;
			};

			if (props.multiple) {

				result.forEach(item => {
					if (!users.value.find(user => user.id == item.id)) users.value.push(item);
				});

			} else users.value = result[0];

			emit('addStaticRole', result);
		}

	} catch (e) {
		notify.error(e.message);
		throw e;
	} finally {
		searchType.value = 'FIO';
		role.value = null;
		loading.value = false;
	}
};

const handleChangeUser = (_users) => {
	emit('addUsers', _users);
	if (props.hideOptions) seacrUserRef.value.blur();
};

</script>

<style scoped lang="scss">
.search {
	display: flex;
	flex-wrap: wrap;
	gap: 5px;
	width: 100%;

	&__type {
		flex: 0 0 90px;
	}

	&__users {
		flex: 1 0 150px;
	}

	&__role {
		flex: 1 0 150px;
	}
}
</style>