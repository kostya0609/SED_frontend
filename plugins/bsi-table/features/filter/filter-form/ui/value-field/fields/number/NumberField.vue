<template>
	<NumberPeriodField
		v-model="value"
		v-if="operator === 7"
	/>
	<NumberInput
		v-model="value"
		v-else
	/>
</template>
<script setup>
import NumberInput from './Number.vue';
import NumberPeriodField from './NumberPeriodField.vue';

defineProps({
	operator: Number,
});

const value = defineModel();
</script>