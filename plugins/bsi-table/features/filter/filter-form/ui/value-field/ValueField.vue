<template>
	<div class="value-field">

		<TextField
			v-if="type === 'string'"
			v-model="value"
		/>
		<DateField
			v-else-if="type === 'date'"
			:operator="operator"
			v-model="value"
		/>
		<NumberField
			v-else-if="type === 'number'"
			:operator="operator"
			v-model="value"
		/>
		<SearchUserField
			v-else-if="type === 'search-user'"
			:operator="operator"
			v-model="value"
		/>
		<SearchDepartmentField
			v-else-if="type === 'search-department'"
			:operator="operator"
			v-model="value"
		/>
		
		<SelectOptionsField
			v-else-if="type === 'select-options'"
			:operator="operator"
			:options="options"  
			v-model="value"
		/>
		<TextField
			v-else
			v-model="value"
		/>
	</div>
</template>
<script setup>

import { TextField, DateField, NumberField, SearchUserField, SearchDepartmentField, SelectOptionsField } from './fields';

defineProps({
	type: String,
	operator: Number,
	options: Array,
});

const value = defineModel();
</script>
<style scoped>
.value-field {
	display: flex;
}

.value-field > * {
	flex: 1;
}
</style>