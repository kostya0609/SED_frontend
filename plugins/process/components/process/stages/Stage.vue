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
import GroupsView from '@/plugins/process/components/process/groups-view/GroupsView.vue';
import GroupsEdit from '@/plugins/process/components/process/groups-edit/GroupsEdit.vue';
import { computed } from 'vue';

const props = defineProps({
	stage: Object,
	mode: {
		required: true,
		validator: mode => ['view', 'edit'].includes(mode),
	},
});

const stage = computed(() => props.stage);
</script>