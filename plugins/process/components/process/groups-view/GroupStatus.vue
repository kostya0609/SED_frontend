<template>
	<el-steps
		:space="200"
		:active="status.active"
		finish-status="success"
		process-status="process"
		align-center
		simple
		class="group-status__steps"
	>
		<el-step title="Не активна" />
		<el-step title="Активна" />
		<el-step title="Завершенна" />
	</el-steps>
</template>
<script setup>
import { GROUP_STATUS } from '@/plugins/process/constants';
import { computed } from 'vue';

const props = defineProps({
	status: {
		type: Number,
		required: true,
	}
});

const status = computed(() => {
	let active = 0;

	switch (props.status) {
		case GROUP_STATUS.DEACTIVATED:
			active = 0;
			break;

		case GROUP_STATUS.ACTIVE:
			active = 1;
			break;

		case GROUP_STATUS.DECIDED:
			active = 3;
			break;
	}

	return { active };
});
</script>
<style scoped lang="scss">
.group-status {
	&__steps {
		background-color: #FAFAFA;
		font-size: 14px;

		::v-deep(.el-step.is-simple .el-step__title) {
			font-size: 14px;
		}

		::v-deep(.el-step__title.is-process) {
			color: var(--el-color-primary);
		}

		::v-deep(.el-step__head.is-process) {
			color: var(--el-color-primary);
			border-color: var(--el-color-primary);
		}
	}
}
</style>