<template>
	<BaseAction :action="action" />
</template>
<script setup>
import BaseAction from './BaseAction.vue';

defineProps({
	action: Object,
});
</script>