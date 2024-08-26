<template>
	<el-scrollbar
		class="form__scrollbar"
		max-height="450"
	>
		<el-tree
			:data="departmentsTree"
			node-key="id"
			:expand-on-click-node="false"
			:default-expanded-keys="[departmentsTree[0].id]"
			class="tree"
			v-if="departmentsTree.length"
		>
			<template #default="{ node, data }">
				<el-checkbox
					v-model="data.checked"
					:checked="departments.includes(+data.id)"
					:disabled="disabled"
					:label="data.label"
					@change="(event) => handleCheckChange(data, event)"
				/>
			</template>
		</el-tree>
	</el-scrollbar>
</template>

<script setup>
import { ref } from 'vue';
import { DepartmentRepo } from '@common/shared/api';

const props = defineProps({
	disabled: Boolean,
});

const departmentsTree = ref([]);
const departments = defineModel({ required: true, type: Array });

const checkedChildren = (data) => {
	data.forEach(el => {

		el.checked = true;

		if (!departments.value.includes(+el.id))
			departments.value.push(+el.id);

		if (Array.isArray(el.children)) checkedChildren(el.children);

	})
};

const handleCheckChange = (data, event) => {

	if (event && !departments.value.includes(+data.id))
		departments.value.push(+data.id);

	if (!event && departments.value.includes(+data.id))
		departments.value = departments.value.filter((dep_id) => dep_id != data.id);

	if (event && Array.isArray(data.children)) checkedChildren(data.children);
}

departmentsTree.value = [await DepartmentRepo.getTree({ view: 'normalize-tree' })];
</script>

<style scoped lang="scss">
.form {
	&__scrollbar {
		width: 100%;
		border: 1px solid var(--el-border-color);
		min-height: 270px;
	}
}
</style>