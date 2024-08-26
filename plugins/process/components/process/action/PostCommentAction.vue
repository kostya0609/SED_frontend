<template>
	<BaseAction :action="action" />
</template>
<script setup>
import BaseAction from '@/plugins/process/components/process/action/BaseAction.vue';

defineProps({
	action: Object,
});
</script>