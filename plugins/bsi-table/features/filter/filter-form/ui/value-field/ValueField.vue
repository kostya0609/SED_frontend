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
		<TextField
			v-else
			v-model="value"
		/>
	</div>
</template>
<script setup>
import { TextField, DateField, NumberField } from './fields';

defineProps({
	type: String,
	operator: Number,
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