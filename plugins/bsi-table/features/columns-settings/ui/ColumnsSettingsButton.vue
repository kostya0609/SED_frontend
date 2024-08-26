<template>
	<el-popover
		trigger="click"
		width="800"
		placement="bottom-start"
	>
		<template #reference>
			<el-button icon="Tools" />
		</template>
		<ColumnsSettings
			v-model="columns"
			@change="columns => $emit('change', columns)"
		/>
	</el-popover>
</template>
<script setup>
import ColumnsSettings from './ColumnsSettings.vue';

const columns = defineModel({ type: Array });

defineEmits(['change']);
</script>