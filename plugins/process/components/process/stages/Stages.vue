<template>
	<el-timeline>
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
import Stage from '@/plugins/process/components/process/stages/Stage.vue';
import { computed } from 'vue';

const props = defineProps({
	stages: Array,
	mode: {
		required: true,
		validator: mode => ['view', 'edit'].includes(mode),
	},
});

const stages = computed(() => props.stages);
</script>