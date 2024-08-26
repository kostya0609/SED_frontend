<template>
	<el-space>
		<el-input-number
			placeholder="От"
			clearable
			controls-position="right"
			v-model="value[0]"
		/>
		<el-input-number
			placeholder="До"
			clearable
			controls-position="right"
			v-model="value[1]"
		/>
	</el-space>
</template>
<script setup>
const value = defineModel({ default: [] });
</script>