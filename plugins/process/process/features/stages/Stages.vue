<template>
	<el-timeline class="stages">
		<el-timeline-item
			v-for="stage in stages"
			:key="stage.id"
			:timestamp="stage.title"
			placement="top"
			hollow
			size="large"
		>
			<Stage
				:stage="stage"
				:mode="mode"
			/>
		</el-timeline-item>
	</el-timeline>
</template>
<script setup>
import Stage from './Stage.vue';
import { computed } from 'vue';
import { useActiveProcess } from '@/plugins/process/common';

const { activeProcess } = useActiveProcess();

const props = defineProps({
	mode: {
		required: true,
		validator: mode => ['view', 'edit'].includes(mode),
	},
});

const stages = computed(() => activeProcess.value.process.stages.filter(stage => {
	if (props.mode === 'edit') return true;

	const groupsWithParticipants = stage.groups.filter(group => group.participants.length);

	return groupsWithParticipants.length > 0;
}));
</script>
<style scoped>
.stages ::v-deep(.el-timeline-item:last-child) {
	padding-bottom: 0;
}
</style>