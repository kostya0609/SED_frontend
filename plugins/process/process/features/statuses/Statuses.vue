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
			v-for="status in activeProcess.process.statuses"
			:key="status.current_status.id"
			:title="status.current_status.title"
		/>
	</el-steps>
</template>
<script setup>
import { computed } from 'vue';
import { useActiveProcess } from '@/plugins/process/common';

const { activeProcess } = useActiveProcess();

const props = defineProps({
	completed: Boolean,
});

const activeStatus = computed(() => {
	if (props.completed) {
		return activeProcess.value.process.statuses.length;
	}

	return activeProcess.value.process.statuses.findIndex(status => status.current_status.id === activeProcess.value.process.status.id);
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

::v-deep(.el-step.is-simple:not(:last-of-type) .el-step__title) {
	@media (min-width: 680px) and (max-width: 1200px) {
		max-width: 80%;
	}
}

::v-deep(.el-step.is-simple .el-step__head) {
	@media (max-width: 768px) {
		display: none;
	}
}
</style>