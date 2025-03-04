<template>
	<el-card>
		<GroupsView
			v-if="mode === 'view'"
			:groups="stage.groups"
		/>
		<GroupsEdit
			v-else
			:groups="stage.groups"
		/>
	</el-card>
</template>
<script setup>
import { computed } from 'vue';
import { GroupsView } from './groups-view';
import { GroupsEdit } from './groups-edit';

const props = defineProps({
	stage: Object,
	mode: {
		required: true,
		validator: mode => ['view', 'edit'].includes(mode),
	},
});

const stage = computed(() => props.stage);
</script>