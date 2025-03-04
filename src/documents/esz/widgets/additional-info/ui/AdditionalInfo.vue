<template>
	<el-empty v-if="!document.template_document || !document.template_document.requirements" />
	<div
		v-else
		v-html="document.template_document.requirements"
	/>
</template>
<script setup>
defineProps({
	document: {
		type: Object,
		required: true,
	}
});
</script>