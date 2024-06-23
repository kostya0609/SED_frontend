<template>
	<el-result
		icon="warning"
		:title="`Ведутся технические работы в модуле бизнес-процессов до ${closeTechnicalWork.process.finishedAt} по Хабаровскому времени`"
		v-if="closeTechnicalWork.process.enable"
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

const updateProcess = inject('updateProcess');
const closeTechnicalWork = inject('closeTechnicalWork');

defineExpose({
	updateProcess,
});
</script>