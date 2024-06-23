<template>
	<el-steps
		class="statuses"
		:space="200"
		:active="activeStatus"
		simple
		finish-status="success"
		process-status="process"
	>
		<el-step
			v-for="status in statuses"
			:key="status.current_status.id"
			:title="status.current_status.title"
		/>
	</el-steps>
</template>
<script setup>
import { computed } from 'vue';

const props = defineProps({
	statuses: Array,
	activeStatusId: {
		type: Number,
		required: false,
	},
	completed: Boolean,
});

const activeStatus = computed(() => {
	if (props.completed) {
		return props.statuses.length;
	}

	return props.statuses.findIndex(status => status.current_status.id === props.activeStatusId);
});
</script>
<style scoped lang="scss">
.statuses ::v-deep(.el-step__head.is-process) {
	color: var(--el-color-primary);
	border-color: var(--el-color-primary);
}

.statuses ::v-deep(.el-step__title.is-process) {
	color: var(--el-color-primary);
}
</style>