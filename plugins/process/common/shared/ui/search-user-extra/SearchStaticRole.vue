<template>
	<el-select
		:class="['width-full']"
		filterable
		remote
		reserve-keyword
		:remote-method="search"
		placeholder="Введите роль"
		clearable
		:loading="loading"
		value-key="value"
	>
		<el-option
			v-for="item in roles"
			:key="item.value"
			:label="item.label"
			:value="item"
		/>
	</el-select>

</template>
<script setup>
import { inject, ref } from 'vue';
import { notify } from '../../utils';

const props = defineProps({
	options: {
		type: Array,
		default: [],
	}
})

const { StaticRoleRepo } = inject('useRepo');

const roles = ref(props.options);
const loading = ref(false);

const search = async (q) => {
	try {
		loading.value = true;

		roles.value = await StaticRoleRepo.search(q.trim());

	} catch (e) {
		notify.error(e.message);
		throw e;
	} finally {
		loading.value = false;
	}
};

defineExpose({
	setRoles: roleList => {
		roles.value = roleList;
	},
	setRole: (value, label) => {
		roles.value = [
			{
				value,
				label
			}
		];
	},
});
</script>