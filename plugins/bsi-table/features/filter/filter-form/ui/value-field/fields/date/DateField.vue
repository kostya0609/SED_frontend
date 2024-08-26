<template>
	<DatePeriodPicker
		v-if="operator === 7"
		v-model="value"
	/>
	<DatePicker
		v-else
		v-model="value"
	/>
</template>
<script setup>
import DatePicker from './DatePicker.vue';
import DatePeriodPicker from './DatePeriodPicker.vue';

defineProps({
	operator: Number,
});

const value = defineModel();
</script>