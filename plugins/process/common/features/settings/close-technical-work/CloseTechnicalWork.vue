<template>
	<el-result
		icon="warning"
		:title="SETTINGS.CLOSE_TECHNICAL_WORK.value"
		v-if="SETTINGS.CLOSE_TECHNICAL_WORK.is_active && !access.full"
	/>
	<template v-else>
		<el-alert
			:closable="false"
			show-icon
			type="warning"
			v-if="SETTINGS.CLOSE_TECHNICAL_WORK.is_active && access.full"
			style="margin-bottom: 1rem;"
		>
			<div>{{ SETTINGS.CLOSE_TECHNICAL_WORK.value }}</div>
			<el-text type="info" size="small">Доступ есть только у администраторов.</el-text>
		</el-alert>
		<slot />
	</template>
</template>
<script setup>
import { useProcessProvider, useSetting } from '@/plugins/process/common';

const { SETTINGS } = useSetting();
const { access } = useProcessProvider();
</script>