<template>
	<el-badge
		:value="count"
		class="badge"
	>
		<template
			#default
			v-if="title"
		>
			{{ title }}
		</template>
	</el-badge>
</template>
<script setup>
defineProps({
	title: {
		type: String,
		required: false,
	},
	count: Number,
});
</script>