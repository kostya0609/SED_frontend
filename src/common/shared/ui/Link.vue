<template>
	<RouterLink
		:to="to || href"
		custom
		v-slot="{ navigate }"
	>
		<el-link
			:underline="underline"
			:type="type"
			@click="navigate"
			:href="href"
			v-bind="$attrs"
		>
			<slot />
		</el-link>
	</RouterLink>
</template>

<script setup>
import { RouterLink } from 'vue-router';
defineProps({
	to: {
		type: [String, Object],
		required: false,
	},
	href: {
		type: [String],
		required: false,
		default: '',
	},
	underline: {
		type: Boolean,
		default: false,
	},
	type: {
		type: String,
		default: 'primary',
	},
});
</script>