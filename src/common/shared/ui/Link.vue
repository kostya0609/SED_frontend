<template>
	<RouterLink
		:to="href"
		custom
		v-slot="{ navigate }"
	>
		<el-link
			:underline="underline"
			:type="type"
			@click="navigate"
			v-bind="$attrs"
		>
			<slot />
		</el-link>
	</RouterLink>
</template>

<script setup>
import { RouterLink } from 'vue-router';
defineProps({
	href: {
		type: [String, Object],
		required: true,
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