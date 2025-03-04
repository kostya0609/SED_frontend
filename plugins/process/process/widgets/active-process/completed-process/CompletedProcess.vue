<template>
	<div class="completed-process">
		<ActualCompletedProcess v-if="activeProcess.process.stages.length && activeProcess.process.statuses.length" />
		<DeprecatedCompletedProcess v-else />
	</div>
</template>
<script setup>
import ActualCompletedProcess from './ActualCompletedProcess.vue';
import DeprecatedCompletedProcess from './DeprecatedCompletedProcess.vue';
import { useActiveProcess } from '@/plugins/process/common';

const { activeProcess } = useActiveProcess();
</script>