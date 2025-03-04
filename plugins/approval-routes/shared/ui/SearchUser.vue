<template>
	<el-select
		ref="seacrUserRef"
		v-model="users"
		:class="['width-full']"
		filterable
		remote
		reserve-keyword
		:remote-method="search"
		placeholder="Введите ФИО"
		clearable
		:loading="loading"
		value-key="id"
		collapse-tags
		:multiple
		@blur="blur"
	>

		<el-option
			v-for="item in userList"
			:key="item.id"
			:label="item.full_name"
			:value="item"
		/>

	</el-select>

</template>

<script setup>
import { ref, watch } from 'vue';
import { notify } from '@/plugins/approval-routes/shared/utils';
import { useUserRepo } from '@/plugins/approval-routes/shared/api';

const UserRepo = useUserRepo();

const users = defineModel('users');

const seacrUserRef = ref();

const props = defineProps({
	multiple: {
		type: Boolean,
		default: false,
	}
});

const userList = ref([]);

if (props.multiple) {
	users.value.forEach(user => {

		userList.value.push({ ...user })

	});

} else userList.value = users.value ? [{ ...users.value }] : [];

const blur = () => {

	if (props.multiple) {
		userList.value = [];

		users.value.forEach(user => {
			userList.value.push({ ...user })
		});

	} else {
		userList.value = users.value ? [{ ...users.value }] : [];
	};

};

const loading = ref(false);

const search = async (query) => {
	if (!query.trim()) return;

	try {
		loading.value = true;

		userList.value = await UserRepo.search(query.trim());

		if (props.multiple) {

			users.value.forEach(user => {

				if (!userList.value.find(item => item.id == user.id)) userList.value.push({ ...user });

			})

		}

	} catch (e) {
		notify.error(e.message);
		throw e;
	} finally {
		loading.value = false;
	}
};

defineExpose({
	setUsers: userList => {
		users.value = userList;
	},
	setUser: (id, full_name, photo = null, link = null) => {
		users.value = [
			{
				value: id,
				label: full_name,
				photo,
				link,
			}
		];
	},

	blur: () => seacrUserRef.value.blur(),

});

</script>
