<template>
	<el-card>
		<GroupsEdit
			v-model:groups="stage.groups"
			v-model:loading="loading"
		/>
	</el-card>
</template>
<script setup>

import { provide } from 'vue';
import { GroupsEdit } from './group';

const stage = defineModel('stage');
const loading = defineModel('loading');

provide('stage', stage);
</script>