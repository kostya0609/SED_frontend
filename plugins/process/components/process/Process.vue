<template>
	<el-result
		icon="warning"
		:title="SETTINGS.CLOSE_TECHNICAL_WORK.value"
		v-if="SETTINGS.CLOSE_TECHNICAL_WORK.is_active"
	/>
	<ActiveProcess v-else>
		<template v-slot:head="process">
			<slot
				name="head"
				:process="process.process"
			/>
		</template>
	</ActiveProcess>
</template>
<script setup>
import ActiveProcess from '@/plugins/process/components/process/active-process/ActiveProcess.vue';
import { inject } from 'vue';
import { useSetting } from '@/plugins/process/utils';

const { SETTINGS } = useSetting();

const updateProcess = inject('updateProcess');

defineExpose({
	updateProcess,
});
</script>