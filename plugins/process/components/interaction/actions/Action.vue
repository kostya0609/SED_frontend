<template>
	<el-button type="primary">
		{{ action.title }}
	</el-button>
</template>
<script setup>
defineProps({
	action: Object,
});
</script>