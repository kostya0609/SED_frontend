<template>
	<el-button :type="action.button_type || 'primary'">
		{{ action.title }}
	</el-button>
</template>
<script setup>
defineProps({
	action: Object,
});
</script>