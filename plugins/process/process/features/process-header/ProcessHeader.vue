<template>
	<div class="process-header">
		<div
			class="process-header__head"
			v-if="showHead"
		>
			<component
				:is="slots.head"
				v-if="slots.head"
				:process="activeProcess.process"
			/>
			<template v-else>
				{{ activeProcess.process.title }}
			</template>
		</div>
		<SelectApprovalRoute
			class="process-header__select-route"
			v-if="access.full"
		/>
	</div>
</template>
<script setup>
import { inject } from 'vue';
import { useActiveProcess, useProcessProvider } from '@/plugins/process/common';
import { useProcessSettings } from '@/plugins/process/process/components';
import { SelectApprovalRoute } from '@/plugins/process/process/features/select-approval-route';

const { activeProcess } = useActiveProcess();
const { showHead } = useProcessSettings();
const { access } = useProcessProvider();

const slots = inject('slots');
</script>
<style lang="scss" scoped>
.process-header {
	display: flex;
	flex-wrap: wrap;
	gap: .5rem;
	align-items: center;

	&__head {
		flex: 1;
		font-weight: bold;
		font-size: 1.07rem;
	}

	&__select-route {
		margin-left: auto;
		flex: 0 1 300px;
	}
}
</style>